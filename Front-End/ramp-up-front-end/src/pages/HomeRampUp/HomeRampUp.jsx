//import React from "react";
import "../../utils/homeRampUp.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import RampUpTable from "../../components/RampUpTable/RampUpTable";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserAction,
  refreshAction,
  selectUser,
} from "../../redux/user/userSlice";
import { useEffect } from "react";

function HomeRampUp() {
  const user = useSelector(selectUser);
  console.log("homeUser ", user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refreshAction());
  }, []);

  const logoutFun = () => {
    dispatch(logoutUserAction({ navigate }));
  };
  return (
    <>
      <CssBaseline />
      <div className="RampUpContainer">
        <div className="RampUpHeader">
          <h1>Ramp Up</h1>
          <h2 id="Stud">Student Management System</h2>
          <div className="userName">
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                fontWeight: "bold",
                color: "red",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {user.email}
              </Typography>
            </Box>
          </div>
          <div className="logout">
            <Stack spacing={2} direction="row">
              <Button variant="contained" id="logoutBtn" onClick={logoutFun}>
                Log Out
              </Button>
            </Stack>
          </div>
        </div>
        <div className="RampUpBody">
          <RampUpTable />
        </div>
      </div>
    </>
  );
}

export default HomeRampUp;
