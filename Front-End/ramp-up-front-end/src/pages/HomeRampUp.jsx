//import React from "react";
import "../utils/homeRampUp.css";
import CssBaseline from "@mui/material/CssBaseline";
import RampUpTable from "../components/RampUpTable";

function HomeRampUp() {
  return (
    <>
      <CssBaseline />
      <div className="RampUpContainer">
        <div className="RampUpHeader">
          <h1>Ramp Up</h1>
          <h2 id="Stud">Student Management System</h2>
        </div>
        <div className="RampUpBody">
          <RampUpTable />
        </div>
      </div>
    </>
  );
}

export default HomeRampUp;
