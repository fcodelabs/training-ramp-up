import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import { Button, Typography, Box, Paper, Modal } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto";
import AddNewUserCard from "./AddNewUser/AddNewUserCard";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/user/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { verifyUser } from "../../redux/user/slice";

import io from "socket.io-client";
import MessageCard from "../../components/Cards/MessageCard";
const DEPLOYED_URL = "https://ramp-up-backend-epcm.onrender.com";
const LOCAL = "http://localhost:5000";
const socket = io(DEPLOYED_URL);
//const socket = io("http://localhost:5000");
console.log("Undersocket", socket);

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
    margin-top: 80px;
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

function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.user.currentUser?.role);
  const verify = useSelector((state: RootState) => state.user.isVerified);

  const [newUserCardModal, setNewUserCardModal] = useState(false);

  const [loggedIn, setLoggedIn] = useState(true);

  const [addUserSuccessCard, setAddUserSuccessCard] = useState(false);
  const [addUserErrorCard, setAddUserErrorCard] = useState(false);

  useEffect(() => {
    socket.on("new-user", (data) => {
      console.log("new-user adding", data);
      if (data === 201) {
        setAddUserSuccessCard(true);
        //dispatch(addUser({ name, email, role }));
      }
      if (data === 400) {
        // dispatch(addStudentError());
        setAddUserErrorCard(true);
      }
    });
  }, [dispatch]);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime && parseInt(expireTime) < Date.now()) {
      console.log("Session Expired");
      setLoggedIn(false);
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 1000 * 60 * 15; // 15 minutes
    localStorage.setItem("expireTime", expireTime.toString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime(); // Call updateExpireTime initially

    window.addEventListener("mousemove", updateExpireTime);
    window.addEventListener("mousedown", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("click", updateExpireTime);

    return () => {
      window.removeEventListener("mousemove", updateExpireTime);
      window.removeEventListener("mousedown", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("click", updateExpireTime);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

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

  const handleLogout = () => {
    console.log("Logout Clicked");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <StyledMainDiv>
      <StyledHeaderBox>
        <StyledTypography variant="h5">Ramp Up Project</StyledTypography>
        <StyledLoginButton variant="outlined" onClick={handleLogout}>
          LOG OUT
        </StyledLoginButton>
      </StyledHeaderBox>
      <StyledDataBox>
        <DataTable handleAddNewUserClick={handleAddClick} />
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
      {addUserSuccessCard && (
        <Modal
          open={addUserSuccessCard}
          onClose={() => setAddUserSuccessCard(false)}
          aria-labelledby="remove-success-modal-title"
          aria-describedby="remove-success-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            <MessageCard
              message="A password creation link has been sent to the provided email address."
              primaryButton={{
                text: "OK",
                onClick: () => setAddUserSuccessCard(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}
      {addUserErrorCard && (
        <Modal
          open={addUserErrorCard}
          onClose={() => setAddUserErrorCard(false)}
          aria-labelledby="remove-success-modal-title"
          aria-describedby="remove-success-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            <MessageCard
              message="Failed to send the password creation link. Please try again later."
              primaryButton={{
                text: "TRY AGAIN LATER",
                onClick: () => setAddUserErrorCard(false),
              }}
              primaryOption="TRY AGAIN LATER"
            />
          </Paper>
        </Modal>
      )}
    </StyledMainDiv>
  );
}

export default AdminPage;
