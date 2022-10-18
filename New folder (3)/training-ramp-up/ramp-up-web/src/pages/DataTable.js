import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Command } from "../components/CommandCell";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
const editField = "inEdit";
import { Upload } from "@progress/kendo-react-upload";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");
import studentSlice from "./slice/studentSlice";
const DataTable = () => {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const student = useSelector((state) => state);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    if (decoded.role == "Admin") {
      setAdmin(true);
    }
    // if (localStorage.getItem("role") == "Admin") {
    //   setAdmin(true);
    // }
  });

  useEffect(() => {
    dispatch(studentSlice.actions.getStudents());
  }, []);

  useEffect(() => {
    setData(student.student.student);
  }, [student]);

  useEffect(() => {
    socket.on("student_received", (data) => {
      alert(data);
      window.location.reload(false);
    });
    socket.on("student_deleted", (data) => {
      alert(data);
      window.location.reload(false);
    });
  }, [socket]);

  const remove = (dataItem) => {
    dispatch(studentSlice.actions.deleteStudent(dataItem));
    socket.emit("student_remove", `Student was delete`);
  };

  const add = (dataItem) => {
    dataItem.inEdit = true;

    socket.emit("student_added", `New student was added`);
    dispatch(studentSlice.actions.createStudent(dataItem));
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;

    dispatch(studentSlice.actions.updateStudent(dataItem));
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = () => {
    // const originalItem = getItems().find((p) => p.id === dataItem.id);
    // const newData = data.map((item) =>
    //   item.id === originalItem.id ? originalItem : item,
    // );
    // setData(newData);
    dispatch(studentSlice.actions.getStudents());
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.id === dataItem.id
          ? { ...item, birth: new Date(item.birth), inEdit: true }
          : item,
      ),
    );
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item,
    );
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false,
    };

    setData([newDataItem, ...data]);
  };

  const CommandCell = (props) => (
    <Command
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const logOut = () => {
    localStorage.removeItem("token", token);
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div>
      <Grid
        style={{
          height: "500px",
        }}
        data={data}
        onItemChange={itemChange}
        editField={editField}
      >
        <GridToolbar>
          <h1>{localStorage.getItem("name")}</h1>
          <p1>{localStorage.getItem("role")}</p1>
          <>
            {admin ? (
              <button
                title="Add new"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                onClick={addNew}
              >
                Add new
              </button>
            ) : (
              <div></div>
            )}
          </>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={logOut}
          >
            LogOut
          </button>
        </GridToolbar>
        <Column field="id" title="ID" width="50px" editable={false} />
        <Column field="name" title="Name" width="200px" />
        <Column field="gender" title="Gender(Male/Female)" width="170px" />
        <Column field="address" title="Address" width="300px" />
        <Column
          field="mobileNo"
          title="Mobile No"
          width="150px"
          editor="numeric"
        />
        <Column
          field="birth"
          title="Date of Birth"
          format="{0:d}"
          editor="date"
          width="150px"
        />
        <Column field="age" title="Age" width="100px" editable={false} />

        {admin && <Column cell={CommandCell} width="200px" title="commond" />}
      </Grid>
      <Upload
        restrictions={{
          allowedExtensions: [".xlsx"],
        }}
        autoUpload={false}
        defaultFiles={[]}
        withCredentials={false}
        saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
        removeUrl={
          "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
        }
      />
    </div>
  );
};

export default DataTable;
