import * as React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "../utils/rampUpTable.css";

import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { StudentData } from "../data/studentDetails";
import CommandCell from "./commandCell";

function RampUpTable() {
  return (
    <Grid
      style={{
        height: "420px",
      }}
      data={StudentData}
      //onItemChange={itemChange}
      //editField={editField}
    >
      <GridToolbar>
        <button
          id="AddBtn"
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          //onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="StudID" title="Id" width="150px" editable={false} />
      <Column field="StudName" title="Name" width="200px" />
      <Column field="StudGender" title="Gender" width="150px" />
      <Column field="StudAddress" title="Address" width="200px" />
      <Column field="StudMobile" title="Mobile" width="150px" />
      <Column
        field="StudDOB"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      <Column field="StudAge" title="Age" width="150px" editor="numeric" />
      <Column cell={CommandCell} title="Command" width="193px" />
    </Grid>
  );
}

export default RampUpTable;
