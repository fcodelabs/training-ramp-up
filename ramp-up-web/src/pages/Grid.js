import React, { useEffect, useState } from "react";

import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
//import { DropDownList } from "@progress/kendo-react-dropdowns";
import { MyCommandCell } from "../components/MyCommandCell";
import { useNavigate } from "react-router-dom";
import {
  insertStudent,
  getStudents,
  //updateStudent,
  deleteStudent,
} from "../utils/services";
import { Upload } from "@progress/kendo-react-upload";
const editField = "inEdit";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const GridUI = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getStudents().then(({ data }) => setData(data));
  }, []);

  useEffect(() => {
    socket.on("refetch_data", () => {
      getStudents()
        .then(({ data }) => setData(data.students))
        .catch(() =>
          alert(
            "Failed to retrieve data, please try refreshing the page or try again another time"
          )
        );
    });
    socket.on("student_received", (data) => {
      alert(data);
      console.log("SocketMSG", data);
      window.location.reload(false);
    });
    socket.on("student_deleted", (data) => {
      alert(data);
      window.location.reload(false);
    });
  }, [socket]);

  const remove = (dataItem) => {
    deleteStudent(dataItem).then(() => {
      getStudents().then((data) => {
        setData(data);
      });
      socket.emit("student_remove", `Student ${dataItem.id} was delete`);
      getStudents();
    });
  };
  const add = (dataItem) => {
    console.log("ID data", dataItem);
    dataItem.inEdit = true;
    socket.emit("student_added", `New student was added`);
    insertStudent(dataItem).then((res) => {
      console.log("data", res.data);
      console.log("data birthday", res.data.date);
      const newData = { ...res.data };

      const oldStudents = data;
      oldStudents.pop(newData);
      setData([newData, ...oldStudents]);
    });
  };
  const update = (dataItem) => {
    console.log("Data items ", dataItem);
  };

  const discard = () => {
    console.log("Checking Dalin Aranga5");
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };
  const cancel = (dataItem) => {
    const originalItem = getStudents().find((p) => p.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    console.log("Enter Edit", dataItem);
    const newData = data.map((item) =>
      item.id === dataItem.id
        ? { ...item, date: new Date(item.date), inEdit: true }
        : item
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
      Discontinued: false,
    };
    setData([newDataItem, ...data]);
  };

  const CommandCell = (props) => (
    <MyCommandCell
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
  const logout = () => {
    navigate("/");
  };
  //const GenderField = ["Male", "Female"];
  return (
    <Grid
      style={{
        height: "100%",
      }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
        >
          Add new
        </button>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={logout}
        >
          Logout
        </button>
        <Upload
          restrictions={{
            allowedExtensions: [".csv", ".xlsx"],
          }}
          autoUpload={false}
          defaultFiles={[]}
          withCredentials={false}
          saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
          removeUrl={
            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
          }
        />
      </GridToolbar>

      <Column field="id" title="ID" width="80px" editable={false} />
      <Column field="name" title="Name" width="200px" />
      <Column field="gender" title="Gender" width="200px" editor="text" />

      <Column field="address" title="Address" width="200px" />
      <Column
        field="mobile_number"
        title="Mobile Number"
        editor="text"
        width="180px"
      />
      <Column
        editor="date"
        format="{0:d}"
        field="date"
        title="Date of Birth"
        width="200px"
      />
      <Column field="age" title="Age" width="130px" editable={false} />

      <Column cell={CommandCell} width="180px" />
    </Grid>
  );
};

export default GridUI;
