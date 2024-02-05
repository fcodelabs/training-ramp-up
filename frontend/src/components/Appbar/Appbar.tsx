import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login, logout } from "../../redux/user/slice";
import PopupNotification from "../../components/Notification/Notification";
import { NotificationTypes } from "../../utilities";
import { useNavigate } from "react-router";
import { Paths } from "../../App";
const AppbarWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1;
  background-color: white;
  flex-direction: raw;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;

const AppbarTitle = styled.div`
  display: flex;
  flex-direction: raw;
  font-size: 24px;
  font-style: normal;
  padding: 5px 0 5px 15px;
  font-weight: 700;
  color: rgba(30, 136, 229, 1);
`;

const ButtonWrapper = styled.div`
  padding: 5px 15px 5px 0;
  display: flex;
  flex-direction: raw;
`;

const Appbar = () => {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleLogin = () => {
    dispatch(login({ user: "test" }));
  };
  const handleLogout = () => {
    setNotification({
      open: true,
      onConfirm: () => {
        dispatch(logout());
      },
      type: NotificationTypes.LOGOUT_USER,
    });
  };

  return (
    <AppbarWrapper>
      <AppbarTitle>Ramp up Project</AppbarTitle>
      <ButtonWrapper>
        {isLogged ? (
          <>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={handleLogin}>
            Login
          </Button>
        )}
        <PopupNotification
          open={notification.open}
          onClose={handleCloseNotification}
          type={notification.type}
          onSubmit={notification.onConfirm}
        />
      </ButtonWrapper>
    </AppbarWrapper>
  );
};

export default Appbar;
