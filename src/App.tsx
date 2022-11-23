import React from "react";
import { students } from "./data/students";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

function App() {
  return (
    <Grid style={{ height: "400px" }} data={students}>
      <GridColumn field="id" title="ID" width="40px" />
      <GridColumn field="name" title="Name" width="250px" />
      <GridColumn field="gender" title="Gender" />
      <GridColumn field="address" title="Address" />
      <GridColumn field="mobile" title="Mobile No" />
      <GridColumn field="dateOfBirth" title="Date of Birth" />
      <GridColumn field="age" title="Age" />
      <GridColumn
        title="Command"
        cell={() => (
          <td className="k-command-cell">
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command">
              Edit
            </button>
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command">
              Remove
            </button>
          </td>
        )}
      />
    </Grid>
  );
}

export default App;
