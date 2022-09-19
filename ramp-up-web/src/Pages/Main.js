import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "../Components/MyCommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../Utils/services";
import { Upload } from "@progress/kendo-react-upload";
// import { DropDownList } from "@progress/kendo-react-dropdowns";
// import { Server } from "socket.io";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
const editField = "inEdit";

const Main = () => {
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    const res = await getItems();
    const formattedData = res.map((e) => ({
      inEdit: false,
      Discontinued: false,
      ...e,
    }));
    setData(formattedData);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    socket.on("student_received", (data) => {
      alert(data);
      fetchItems();
    });
    socket.on("student_deleted", (data) => {
      alert(data);
      fetchItems();
    });
  }, [socket]);

  const remove = (dataItem) => {
    try {
      deleteItem(dataItem);
      socket.emit("student_removed", `Student was deleted`);
      alert("Student was deleted");
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const add = (dataItem) => {
    dataItem.inEdit = true;
    try {
      insertItem(dataItem);
      socket.emit("student_added", `Student was added `);
      alert("Student was added");
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const update = (dataItem) => {
    // dataItem.inEdit = false;

    try {
      updateItem(dataItem);

      // updateItem(dataItem).then((res) => {
      //   console.log("res dara", res.data);

      // });

      socket.emit("student_added", `Student was changed`);
      alert("Student was updated");
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);

    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.ID === dataItem.ID);
    const newData = data.map((item) =>
      item.ID === originalItem.ID ? originalItem : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.ID === dataItem.ID
          ? { ...item, DOB: new Date(item.DOB), inEdit: true }
          : item
      )
    );
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.ID === event.dataItem.ID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };

  const addNew = () => {
    try {
      socket.emit("student_added");
      const newDataItem = {
        inEdit: true,
        Discontinued: false,
      };
      setData([newDataItem, ...data]);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <Grid
      style={{
        height: "1000px",
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
      <Column field="ID" title="ID" width="50px" editable={false} />
      <Column field="StudentName" title="Student Name" width="200px" />
      <Column field="Gender" title="Gender" width="120px" />
      {/* <DropDownList Gender={["Female", "Male", "Other"]}/> */}
      <Column field="Address" title="Address" width="200px" />
      <Column field="MobileNo" title="Mobile No" width="150px" />
      <Column
        field="DOB"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="175px"
      />

      <Column field="Age" title="Age" width="150px" editable={false} />
      <Column cell={CommandCell} title="Command" width="200px" />
    </Grid>
  );
};

export default Main;
