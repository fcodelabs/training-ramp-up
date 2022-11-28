import * as React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "../../utils/rampUpTable.css";

import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
//import { StudentData } from "../data/studentDetails";
import DropDownCell from "../DropDownCell/DropDownCell";
import CommandCell from "../CommandCell/CommandCell";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addStudentAction,
  deleteStudentAction,
  getStudentAction,
  selectStudent,
  updateStudentAction,
} from "../../redux/student/studentSlice";

import { io } from "socket.io-client";
import { selectUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});

const editField = "inEdit";

function RampUpTable() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  const students = useSelector(selectStudent);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const userDetails = user;
  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  useEffect(() => {
    dispatch(getStudentAction());
  }, []);

  const studentRecords = students;
  useEffect(() => {
    setData(studentRecords);
  }, [studentRecords]);

  useEffect(() => {
    console.log("useEffect");

    socket.on("connect", () => {
      console.log("Socket Id ", socket.id);
    });

    socket.on("student_added", (data) => {
      alert(data);
      dispatch(getStudentAction());
    });

    socket.on("student_updated", (data) => {
      alert(data);
      dispatch(getStudentAction());
    });

    socket.on("student_deleted", (data) => {
      alert(data);
      dispatch(getStudentAction());
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off();
    };
  }, [studentRecords, socket]);

  const add = (dataItem) => {
    dataItem.inEdit = true;
    dispatch(addStudentAction({ dataItem, navigate }));
  };

  const update = (dataItem) => {
    dataItem.inEdit = true;
    dispatch(updateStudentAction({ dataItem, navigate }));
  };

  const remove = (dataItem) => {
    dispatch(deleteStudentAction({ dataItem, navigate }));
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = students.find((e) => e.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item
    );
    setData(newData);
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      discontinued: false,
    };
    setData([newDataItem, ...data]);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.id === dataItem.id
          ? { ...item, birthday: new Date(item.birthday), inEdit: true }
          : item
      )
    );
  };

  const commands = (props) => (
    <CommandCell
      {...props}
      add={add}
      discard={discard}
      editField={editField}
      update={update}
      remove={remove}
      cancel={cancel}
      edit={enterEdit}
      role={userData.role}
      email={userData.email}
    />
  );
  return (
    <Grid
      style={{
        height: "420px",
      }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          id="AddBtn"
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
          disabled={userData.role === "admin" ? false : true}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="id" title="Id" width="150px" editable={false} />
      <Column field="name" title="Name" width="200px" />
      <Column field="gender" title="Gender" width="150px" cell={DropDownCell} />
      <Column field="address" title="Address" width="200px" />
      <Column field="mobile" title="Mobile" width="150px" type="number" />
      <Column
        field="birthday"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      <Column
        field="age"
        title="Age"
        width="150px"
        type="number"
        editable={false}
      />
      <Column cell={commands} title="Command" width="193px" />
    </Grid>
  );
}

export default RampUpTable;
