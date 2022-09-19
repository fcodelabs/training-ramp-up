import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Command } from "../component/CommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../utils/services";
const editField = "inEdit";
import { Upload } from "@progress/kendo-react-upload";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems().then(({ data }) => setData(data));
  }, []);

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
    deleteItem(dataItem).then(() => {
      getItems().then((data) => {
        setData(data);
      });
      socket.emit("student_remove", `Student was delete`);
      alert("Student was delete");
      getItems();
    });
  };

  const add = (dataItem) => {
    console.log("id data", dataItem);
    dataItem.inEdit = true;
    socket.emit("student_added", `New student was added`);

    insertItem(dataItem).then((res) => {
      console.log("data", res.data);

      window.location.reload(false);
      alert("Student was Added");
    });
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;
    socket.emit("student_added", `Student Changed`);
    updateItem(dataItem).then((res) => {
      console.log("res dara", res.data);

      window.location.reload(false);
      alert("Student was Updated");
    });
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item,
    );
    setData(newData);
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
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={addNew}
          >
            Add new
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

        <Column cell={CommandCell} width="200px" title="commond" />
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
