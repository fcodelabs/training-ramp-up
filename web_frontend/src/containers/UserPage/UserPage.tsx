import React from "react";
import { Box, Button } from "@mui/material";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTE } from "../../util/routeUtil";

const StudentPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Button
        variant="contained"
        color="secondary"
        sx={{ position: "fixed", top: 100, right: 100 }}
        onClick={() => {
          navigate(STUDENT_ROUTE);
        }}
      >
        Manage Students
      </Button>
      <Box sx={{ py: 20, px: 40 }}>
        <UserDataGrid />
      </Box>
    </>
  );
};

export default StudentPage;
