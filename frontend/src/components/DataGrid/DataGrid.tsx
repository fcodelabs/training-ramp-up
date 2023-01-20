import { FC, useEffect, useState } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { Gender, Student } from "../../utils/student";
import { Button } from "@progress/kendo-react-buttons";
import { userValidationSchema } from "../../utils/personValidation";
import moment from "moment";
import "./DataGrid.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";
import { createStudent, getStudent, removeStudent, updateStudent } from "./studentSlice";

const initialStudent: Student = {
  id: 0,
  name: "",
  gender: Gender.MALE,
  address: "",
  mobileNo: "",
  birthday: null,
  age: null,
  isAdding: false,
  isEditing: false,
  keyId: null,
  inEdit: false,
};

// Returns the index of element of given arr which have number field = value
const getIndex = (arr: Student[], field: keyof Student, value: number) => {
  let ind = -1;
  arr.forEach((val, index) => {
    if (val[field] === value) {
      ind = index;
    }
  });
  return ind;
};

const DataGrid: FC = () => {
  // These are used to store previous edit data in cased of use to restore if updates were canceled.
  const [editIds, setEditIds] = useState<number[]>([]);
  const [prevEditData, setPrevEditData] = useState<Map<number, Student>>(new Map());

  // keyId identifies all the rows in the Grid uniquely. Used specially to identify newly adding rows which does not have id yet
  const [keyIdCount, setKeyIdCount] = useState<number>(0);

  const students = useSelector((state: RootState) => state.student.value);

  const dispatch = useDispatch();

  // Grid data denotes the data currently in app (without saving to redux store)
  // eslint-disable-next-line prefer-const
  let [gridData, setGridData] = useState<Student[]>([]);

  // Gets data from database at the first time the component renders
  useEffect(() => {
    dispatch(getStudent());
  }, []);

  useEffect(() => {
    // Grid Data item is updated from database updates only if it is not currently updating
    students.forEach((item, index) => {
      const ind = getIndex(gridData, "id", item.id as number);
      const newItem = {
        ...item,
        isAdding: false,
        isEditing: false,
        inEdit: false,
        keyId: index,
        birthday: new Date(item.birthday as unknown as string),
      };
      if (ind < 0) {
        gridData.unshift(newItem);
      } else if (!gridData[ind].isEditing) {
        gridData[ind] = newItem;
      } else {
        // Previous data is set to database data
        prevEditData.set(item.id as number, newItem);
      }
    });
    const newGridData: Student[] = [];
    gridData.forEach((value) => {
      if (value.isAdding || getIndex(students, "id", value.id as number) >= 0) {
        newGridData.push(value);
      }
    });
    setPrevEditData(prevEditData);
    setKeyIdCount(students.length);
    setGridData(newGridData);
  }, [students]);

  // Handles clicking Add New button. Adds an empty record after assigning it a unique keyId value
  const handleAddNewClick = () => {
    const newRecord = { ...initialStudent, isAdding: true, keyId: keyIdCount, inEdit: true };
    gridData.unshift(newRecord);
    setKeyIdCount(keyIdCount + 1);
    setGridData([...gridData]);
  };

  // Handles clicking Discard changes while adding. Removes corresponding adding record from grid data
  const handleDiscardChanges = (keyId: number) => {
    const ind = getIndex(gridData, "keyId", keyId);
    gridData.splice(ind, 1);
    setGridData([...gridData]);
  };

  // Handles clicking add button while adding. Validates and dispatches for creating
  const addRecord = (keyId: number) => {
    let ind = getIndex(gridData, "keyId", keyId);
    const addData = gridData[ind];
    userValidationSchema
      .validate({
        name: addData.name,
        gender: addData.gender,
        address: addData.address,
        mobileNo: addData.mobileNo,
        age: addData.age,
      })
      .then(() => {
        ind = getIndex(gridData, "keyId", keyId);
        gridData.splice(ind, 1);
        dispatch(createStudent(addData));
      })
      .catch((err) => {
        alert(err.errors);
      });
  };

  // Handles clicking Remove Button.
  const removeRecord = (id: number) => {
    dispatch(removeStudent(id));
  };

  // Handles clicking Edit button. Save current data to prevEditData and make the row editable
  const handleEditClick = (id: number) => {
    setEditIds([...editIds, id]);
    const ind = getIndex(gridData, "id", id);
    prevEditData.set(id, { ...gridData[ind] });
    gridData[ind].isEditing = true;
    gridData[ind].inEdit = true;
    setGridData([...gridData]);
  };

  // Handles clicking update button. Removes previous data and dispatches current data to update action
  const editRecord = (id: number) => {
    let ind = getIndex(gridData, "id", id);
    const editData = gridData[ind];
    userValidationSchema
      .validate({
        id: editData.id,
        name: editData.name,
        gender: editData.gender,
        address: editData.address,
        mobileNo: editData.mobileNo,
        age: editData.age,
      })
      .then(() => {
        dispatch(updateStudent(editData));
        ind = getIndex(gridData, "id", id);
        gridData[ind].isEditing = false;
        setGridData(gridData);
        editIds.splice(editIds.indexOf(id), 1);
        prevEditData.delete(id);
        setPrevEditData(prevEditData);
        setEditIds([...editIds]);
      })
      .catch((err) => {
        alert(err.errors);
      });
  };

  // Handles clicking Cancel while updating. Pops previous data to row
  const handleCancel = (id: number) => {
    const ind = getIndex(gridData, "id", id);
    gridData[ind] = prevEditData.get(id) as Student;
    editIds.splice(editIds.indexOf(id), 1);
    prevEditData.delete(id);
    setPrevEditData(prevEditData);
    setEditIds([...editIds]);
  };

  // Handles item change in Grid. Changes gridData and re renders component
  const itemChange = (event: GridItemChangeEvent) => {
    const field = event.field as keyof Student;
    const ind = getIndex(gridData, "keyId", event.dataItem.keyId);
    if (field === "birthday") {
      gridData[ind].birthday = event.value;
      gridData[ind].age = moment().diff(event.value, "years");
    } else {
      gridData[ind] = { ...gridData[ind], [field]: event.value };
    }
    setGridData([...gridData]);
  };

  // Handles gender change in Grid. Changes gridData and re renders component
  const dropDownChange = (event: DropDownListChangeEvent, keyId: number) => {
    const ind = getIndex(gridData, "keyId", keyId);
    gridData[ind].gender = event.value;
    setGridData([...gridData]);
  };

  return (
    <div>
      <Grid editField="inEdit" onItemChange={itemChange} data={gridData}>
        <GridToolbar>
          <div>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid"
              onClick={handleAddNewClick}
            >
              Add new
            </button>
          </div>
        </GridToolbar>
        <GridColumn
          title="Id"
          field="id"
          editor="numeric"
          cell={(props: GridCellProps) => {
            if (props.dataItem.isAdding) {
              return <td></td>;
            } else {
              return <td>{props.dataItem.id}</td>;
            }
          }}
        />
        <GridColumn title="Name" field="name" editor="text" />
        <GridColumn
          title="Gender"
          field="gender"
          cell={(props: GridCellProps) => {
            if (props.dataItem.isAdding || props.dataItem.isEditing) {
              return (
                <td>
                  <DropDownList
                    data={[Gender.MALE, Gender.FEMALE, Gender.OTHER]}
                    onChange={(event) => {
                      dropDownChange(event, props.dataItem.keyId);
                    }}
                    value={props.dataItem.gender}
                  />
                </td>
              );
            } else {
              return <td>{props.dataItem.gender}</td>;
            }
          }}
        />
        <GridColumn title="Address" field="address" editor="text" />
        <GridColumn title="Mobile No" field="mobileNo" editor="text" />
        <GridColumn
          title="Date of Birth"
          field="birthday"
          editor="date"
          format="{0:E MMM dd yyyy}"
        />
        <GridColumn
          title="Age"
          field="age"
          editor="numeric"
          cell={(props: GridCellProps) => {
            if (props.dataItem.isAdding) {
              return <td></td>;
            } else {
              return <td>{props.dataItem.age}</td>;
            }
          }}
        />
        {/* eslint-disable-next-line react/prop-types */}
        <GridColumn
          title="command"
          field="command"
          cell={(props: GridCellProps) => {
            if (props.dataItem.isAdding) {
              return (
                <td>
                  <Button
                    onClick={() => {
                      addRecord(props.dataItem.keyId);
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      handleDiscardChanges(props.dataItem.keyId);
                    }}
                  >
                    Discard Changes
                  </Button>
                </td>
              );
            } else if (props.dataItem.isEditing) {
              return (
                <td>
                  <Button
                    onClick={() => {
                      editRecord(props.dataItem.id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      handleCancel(props.dataItem.id);
                    }}
                  >
                    Cancel
                  </Button>
                </td>
              );
            } else {
              return (
                <td>
                  <Button
                    className="command-edit-button"
                    onClick={() => {
                      handleEditClick(props.dataItem.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      removeRecord(props.dataItem.id);
                    }}
                  >
                    Remove
                  </Button>
                </td>
              );
            }
          }}
        />
      </Grid>
    </div>
  );
};

export default DataGrid;
