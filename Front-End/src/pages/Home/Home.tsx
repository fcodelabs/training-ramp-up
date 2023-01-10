/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "../../slice/HomeSlice";
import { logoutUserAction } from "../../slice/UserSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { Box, Container } from "@mui/material";

const cookies = new Cookies();

export default function Datagrid() {
  const editField = "inEdit";
  const students = useSelector(selectStudent);
  const [disable, setDisabled] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const [editedFeilds, setEditedFields] = React.useState(
    Array<{ id: number; value: Map<string, any> }>()
  );

  React.useEffect(() => {
    const user = cookies.get("user");
    console.log(user);
    const decoded: any = jwtDecode(user);
    const adminUser = decoded.role == "admin" ? false : true;
    setDisabled(adminUser);
    dispatch(getStudentsAction());
  }, []);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Id ", socket.id);
    });

    socket.on("message", (data) => {
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

  const add = (dataItem: any) => {
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
    console.log("edit");
    dispatch(setStudentsAction(tempArray));
  };

  const update = (dataItem: any) => {
    const fieldsToBeUpdated = editedFeilds.filter(
      (item: { id: number }) => item.id == dataItem.id
    )[0];

    if (fieldsToBeUpdated != undefined) {
      // const data: any = { id: fieldsToBeUpdated.id };
      // fieldsToBeUpdated.value.forEach((value: any, key: string | number) => {
      //   data[key] = value;
      // });
      // console.log(data);

      if (validate(dataItem)) {
        dispatch(updateStudentAction(fieldsToBeUpdated as any));
        const index = editedFeilds.indexOf(fieldsToBeUpdated);
        editedFeilds.splice(index, 1);
      } else {
        console.log("Invalid");
      }
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

    if (e.field) {
      const studentObj = editedFeilds.filter(
        (student) => student.id === e.dataItem.id
      )[0];

      if (studentObj != undefined) {
        studentObj.value.set(e.field, e.value);
      } else {
        const changedStudent = {
          id: e.dataItem.id,
          value: new Map([[e.field, e.value]]),
        };
        editedFeilds.push(changedStudent);
      }
      setEditedFields([...editedFeilds]);
    }

    dispatch(setStudentsAction(newData));
  };

  const logout = () => {
    dispatch(logoutUserAction());
  };

  //command cell

  const command = (props: GridCellProps) => (
    <CommandCell
      {...props}
      add={add}
      edit={edit}
      update={update}
      discard={discard}
      cancel={cancel}
      remove={remove}
      disable={disable}
    />
  );

  return (
    <Box>
      {/* logout button */}
      <Container>
        <button
          title="Sign Out"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={logout}
        >
          Sign Out
        </button>
      </Container>

      {/* grid */}
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
            disabled={disable}
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
    </Box>
  );
}
