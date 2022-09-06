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
const editField = "inEdit";
import { Upload } from "@progress/kendo-react-upload";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []);

  const remove = (dataItem) => {
    const newData = deleteItem(dataItem);
    setData(newData);
  };

  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
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
        <Column field="Gender" title="Gender" width="100px" />
        <Column field="Address" title="Address" width="300px" />
        <Column
          field="MobileNo"
          title="Mobile No"
          width="150px"
          type="number"
        />

        <Column
          field="Birth"
          title="First Ordered"
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
