import * as React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "../utils/rampUpTable.css";

import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
//import { StudentData } from "../data/studentDetails";
import CommandCell from "./commandCell";
import { insertStudent, getStudent, updateStudent } from "../data/services";
import { useState, useEffect } from "react";
const editField = "inEdit";

function RampUpTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let newItems = getStudent();
    setData(newItems);
  }, []);

  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertStudent(dataItem);
    setData(newData);
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateStudent(dataItem);
    setData(newData);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getStudent().find(
      (e) => e.studentID === dataItem.studentID
    );
    const newData = data.map((item) =>
      item.studentID === originalItem.studentID ? originalItem : item
    );
    setData(newData);
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.studentID === event.dataItem.studentID
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

  const commands = (props) => (
    <CommandCell
      {...props}
      add={add}
      discard={discard}
      editField={editField}
      update={update}
      cancel={cancel}
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
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="studentID" title="Id" width="150px" editable={false} />
      <Column field="studentName" title="Name" width="200px" />
      <Column field="studentGender" title="Gender" width="150px" />
      <Column field="studentAddress" title="Address" width="200px" />
      <Column
        field="studentMobile"
        title="Mobile"
        width="150px"
        type="number"
      />
      <Column
        field="studentDOB"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      <Column field="studentAge" title="Age" width="150px" editor="numeric" />
      <Column field="discontinued" title="Discontinued" editor="boolean" />
      <Column cell={commands} title="Command" width="193px" />
    </Grid>
  );
}

export default RampUpTable;
