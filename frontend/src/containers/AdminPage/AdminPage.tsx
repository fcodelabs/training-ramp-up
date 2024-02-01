import React, { useState } from "react";
import DataTable from "./DataTable/DataTable";
import { Button, Typography, Box, Paper, Modal } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto";
import AddNewUserCard from "../../components/Cards/AddNewUserCard";

const StyledHeaderBox = styled(Box)`
  &&& {
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    padding: 8px 24px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLoginButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledTypography = styled(Typography)`
  &&& {
    width: 181px;
    height: 32px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0px;
    text-align: left;
    color: #1e88e5;
  }
`;

const StyledDataBox = styled(Box)`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 50px;
  }
`;

const StyledMainDiv = styled.div`
  &&& {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
  }
`;

const StyledAddNewUserButton = styled(Button)`
  &&& {
    background-color: #2196f3;
    color: #ffffff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

const StyledTopBox = styled(Box)`
  &&& {
    display: flex;

    width: 1153.2px;
    align-self: center;
    justify-content: flex-end;
    margin-top: 80px;
    background-color: rgba(33, 150, 243, 0.08);
    border-radius: 4px;
    padding: 12px;
  }
`;

function AdminPage() {
  const [newUserCardModal, setNewUserCardModal] = useState(false);

  const handleAddClick = () => {
    console.log("add new Clicked");
    setNewUserCardModal(true);
  };

  const handleCancelClick = () => {
    console.log("cancel Clicked");
    setNewUserCardModal(false);
  };

  const handleSubmitClick = (name: string, email: string, role: string) => {
    console.log("Submit Clicked");
    setNewUserCardModal(false);
    console.log(name, email, role);
  };

  return (
    <StyledMainDiv>
      <StyledHeaderBox>
        <StyledTypography variant="h5">Ramp Up Project</StyledTypography>
        <StyledLoginButton variant="outlined">LOGIN</StyledLoginButton>
      </StyledHeaderBox>
      <StyledTopBox>
        <StyledAddNewUserButton variant="contained" onClick={handleAddClick}>
          Add New User
        </StyledAddNewUserButton>
      </StyledTopBox>
      <StyledDataBox>
        <DataTable />
      </StyledDataBox>
      {newUserCardModal && (
        <Modal
          open={newUserCardModal}
          onClose={handleCancelClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            <AddNewUserCard
              onSubmit={handleSubmitClick}
              onCancel={handleCancelClick}
            />
          </Paper>
        </Modal>
      )}
    </StyledMainDiv>
  );
}

export default AdminPage;
