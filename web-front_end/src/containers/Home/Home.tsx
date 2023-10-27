import React, { useState } from "react";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import { Button, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../util/routesUtil";
import { ERoleTypeEnum } from "../../enum/roleTypeEnum";

const Home = () => {
  const currentRoleType = useSelector((state: RootState) => state.userEntries.currentRoleType);
  const [showStudentData, setShowStudentData] = useState(currentRoleType === ERoleTypeEnum.USER ? false : true);
  const [showUserData, setShowUserData] = useState(currentRoleType === ERoleTypeEnum.USER ? true : false);

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const handleStudentButtonClick = () => {
    setShowStudentData(true);
    setShowUserData(false);
  };

  const handleUserButtonClick = () => {
    setShowStudentData(false);
    setShowUserData(true);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" paddingTop="2em">
            {currentRoleType === ERoleTypeEnum.ADMIN && (
              <>
                <Button
                  variant="contained"
                  onClick={handleStudentButtonClick}
                  sx={{ margin: "1em" }}
                >
                  Student Manage
                </Button>
                <Button variant="contained" onClick={handleUserButtonClick} sx={{ margin: "1em" }}>
                  User Manage
                </Button>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              dispatch(userActions.signOut());
              navigator(SIGN_IN);
            }}
            sx={{ margin: "1em" }}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      {showStudentData && <StudentDataGrid />}
      {showUserData && <UserDataGrid />}
    </>
  );
};

export default Home;
