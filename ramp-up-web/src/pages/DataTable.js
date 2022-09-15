import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Command } from "../componets/CommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../utils/services";
import { DropDownList } from "@progress/kendo-react-dropdowns";
const editField = "inEdit";
import { Upload } from "@progress/kendo-react-upload";
//import axios from "axios";
//import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const DataTable = () => {
  const [data, setData] = useState([]);

  // useEffect(async () => {
  //   let newItems = await getItems();
  //   console.log("newItem", newItems);
  //   setData(newItems);
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     let newItems = await getItems();
  //     //console.log("newItem", newItems);
  //     //console.log("newData", data);
  //     setData(newItems);
  //   }
  //   fetchData();
  // }, [getItems]);

  useEffect(() => {
    getItems().then(({ data }) => setData(data));
  }, []);

  useEffect(() => {
    socket.on("refetch_data", () => {
      getItems()
        .then(({ data }) => setData(data.students))
        .catch(() =>
          alert(
            "Failed to retrieve data, please try refreshing the page or try again another time",
          ),
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
  // useEffect(() => {
  //   axios.get("http://localhost:8000").then((res) => {
  //     //console.log("DAta", res.data);
  //     //data = res.data;
  //     setData(res.data);
  //     //data.push(data);
  //     //setData(res.data);
  //     //data = value;
  //     console.log("data", data);
  //   });
  // });

  const remove = (dataItem) => {
    deleteItem(dataItem).then(() => {
      getItems().then((data) => {
        setData(data);
      });
      socket.emit("student_remove", `Student ${dataItem.ID} was delete`);
      getItems();
    });
    //const newData = [...deleteItem(dataItem)];
    //setData(newData);
    //getItems();
  };

  const add = (dataItem) => {
    console.log("ID data", dataItem);
    dataItem.inEdit = true;
    socket.emit("student_added", `New student was added`);
    insertItem(dataItem).then((res) => {
      console.log("data", res.data);
      const newData = { ...res.data };

      const oldStudents = data;
      oldStudents.pop(newData);
      //data.push(newData);
      setData([newData, ...oldStudents]);

      //socket.emit("student_data_change");
    });

    // const newData = insertItem(dataItem);
    // data.push(newData);
    // socket.emit("student_received");
    // getItems();
  };

  const update = (dataItem) => {
    updateItem(dataItem).then(() => {
      console.log("Updated");
    });
    // dataItem.inEdit = false;
    // const newData = updateItem(dataItem);
    // setData(newData);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.ID === dataItem.ID);
    const newData = data.map((item) =>
      item.ID === originalItem.ID ? originalItem : item,
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.ID === dataItem.ID ? { ...item, inEdit: true } : item,
      ),
    );
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.ID === event.dataItem.ID
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

  const GenderField = ["Male", "Female"];

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
        <Column field="ID" title="ID" width="50px" editable={false} />
        <Column field="Name" title="Name" width="200px" />
        <Column
          field="Gender"
          title="Gender"
          width="100px"
          editor={<DropDownList data={GenderField} defaultValue="Gender" />}
        />
        <Column field="Address" title="Address" width="300px" />
        <Column
          field="MobileNo"
          title="Mobile No"
          width="150px"
          editor="numeric"
        />

        <Column
          field="Birth"
          title="Date of Birth"
          format="{0:d}"
          editor="date"
          width="150px"
        />
        <Column field="Age" title="Age" width="100px" editable={false} />

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
