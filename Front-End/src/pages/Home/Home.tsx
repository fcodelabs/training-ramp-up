import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import { CommandCell } from "../../components/CommandCell/CommandCell";
import { DropDownCell } from "../../components/DropDownCell/DropDownCell";
import { Student } from "../../utils/Interfaces/Student";
import { DatePickerCell } from "../../components/DatePickerCell/DatePickerCell";
import {
  addStudentAction,
  deleteStudentAction,
  getStudentsAction,
  selectStudent,
  setStudentsAction,
  updateStudentAction,
} from "./HomeSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});

export default function Datagrid() {
  const editField = "inEdit";
  const students = useSelector(selectStudent);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStudentsAction());
  }, []);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Id ", socket.id);
    });

    socket.on("student_added", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("student_updated", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("student_deleted", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off();
    };
  }, [students, socket]);

  const validations = new Map([
    ["name", new RegExp("^([A-z\\s.]{3,80})$")],
    ["address", new RegExp("^([A-z0-9/,\\s]{3,})$")],
    ["mobile", new RegExp("^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$")],
    ["gender", new RegExp("^(MALE|FEMALE)$", "i")],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFields = (inputValue: any, field: string): boolean => {
    const key = validations.get(field);
    const valid = key ? key.test(inputValue) : true;
    if (inputValue && valid) {
      return true;
    } else {
      alert("Please enter valid " + field);
      return false;
    }
  };

  const validate = (item: Student): boolean => {
    return (
      validateFields(item.name, "name") &&
      validateFields(item.gender, "gender") &&
      validateFields(item.address, "address") &&
      validateFields(item.mobile, "mobile") &&
      validateFields(item.birthday, "birthday")
    );
  };

  const addNew = () => {
    const newDataItem: Student = {
      inEdit: true,
      birthday: undefined,
    };

    dispatch(setStudentsAction([newDataItem, ...students]));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const add = (dataItem: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const student: any = {
      name: dataItem.name,
      gender: dataItem.gender,
      address: dataItem.address,
      birthday: dataItem.birthday,
      age: dataItem.age,
      mobile: dataItem.mobile,
      inEdit: false,
    };
    if (validate(student)) {
      dispatch(addStudentAction(student));
    }
  };

  const discard = () => {
    const tempArray = [...students];
    tempArray.shift();
    dispatch(setStudentsAction(tempArray));
  };

  const edit = (dataItem: Student): void => {
    const tempArray = [...students];
    const temp = { ...dataItem };
    temp.inEdit = true;
    const index = tempArray.indexOf(dataItem);
    tempArray[index] = temp;
    dispatch(setStudentsAction(tempArray));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (dataItem: any) => {
    if (validate(dataItem)) {
      dispatch(updateStudentAction(dataItem));
    }
  };

  const cancel = (): void => {
    dispatch(getStudentsAction());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const remove = (dataItem: any) => {
    const id = dataItem.id;
    dispatch(deleteStudentAction(id));
  };

  const itemChange = (e: GridItemChangeEvent) => {
    let age = e.dataItem.age;

    if (e.field === "birthday") {
      const today = new Date().getTime();
      const birthday = e.value.getTime();
      const tempAge = Math.floor((today - birthday) / (86400000 * 365));
      age = tempAge >= 18 ? tempAge : "";
    }

    const newData = students.map((student: { id: number }) =>
      student.id === e.dataItem.id
        ? { ...student, [e.field || ""]: e.value, age: age }
        : student
    );
    dispatch(setStudentsAction(newData));
  };

  //command cell

  const command = (props: GridCellProps) => (
    <CommandCell
      {...props}
      remove={remove}
      add={add}
      discard={discard}
      edit={edit}
      update={update}
      cancel={cancel}
    />
  );

  return (
    <Grid
      style={{ margin: "3vh" }}
      data={students}
      editField={editField}
      onItemChange={itemChange}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <GridColumn
        field="id"
        title="ID"
        width="50px"
        editable={false}
        className="k-grid-textbox"
      />
      <GridColumn field="name" title="Name" editor="text" />
      <GridColumn field="gender" title="Gender" cell={DropDownCell} />
      <GridColumn field="address" title="Address" editor="text" />
      <GridColumn field="mobile" title="Mobile No" editor="text" />
      <GridColumn
        field="birthday"
        title="Date of Birth"
        format="{0:D}"
        width="210px"
        cell={DatePickerCell}
      />
      <GridColumn field="age" title="Age" editable={false} />
      <GridColumn cell={command} title="Command" width="220px" />
    </Grid>
  );
}
