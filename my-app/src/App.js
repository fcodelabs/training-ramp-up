import React from "react";

//importing material theme
import "@progress/kendo-theme-material/dist/all.css"
// import kendo table components 
import {Grid,GridColumn,GridToolbar} from "@progress/kendo-react-grid";
//import dummy data
import studentData from "./data/students.json"
//import action buttons cell 
import MyCommandCell from "./components/MyCommandCell";

export default function App() {
  
  const commandCell =()=> <MyCommandCell />

  return (
    <Grid
      data={studentData}
    >
      <GridToolbar>
        <div >
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md "
            style={{background:"#e2e8f0",color:"#000"}}
          >
            Add new
          </button>
        </div>
      </GridToolbar>
      <GridColumn field="id" title="ID" />
      <GridColumn field="name" title="Name" />
      <GridColumn field="gender" title="Gender" />
      <GridColumn field="mobile-No" title="Mobile-No" />
      <GridColumn field="date of birth" title="Date of Birth" />
      <GridColumn field="age" title="Age" />
      <GridColumn cell={commandCell} title="command" />
    </Grid>
  );
}
