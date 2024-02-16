import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "@mui/system/styled";
import "@fontsource/roboto";
import { loginUser, setVerifyUser, verifyUser } from "../../redux/user/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageCard from "../../components/Cards/MessageCard";

import io from "socket.io-client";
const DEPLOYED_URL = "https://backend.ramp-up-epcm.me";
const LOCAL = "http://localhost:5000";
const socket = io(LOCAL);
//const socket = io("http://localhost:5000");
console.log("Undersocket login", socket);

const StyledContainer = styled(Container)`
  &&& {
    width: auto;
    height: 282px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledTypography = styled(Typography)`
  &&& {
    font-family: Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 32.02px;
    color: #000000de;
    align-content: flex-start;
    padding: 16px 0px;
  }
`;

const StyledHeaderBox = styled(Box)`
  &&& {
    display: flex;
    width: auto;
    height: 64px;
    align-items: flex-start;
  }
`;

const StyledFormBox = styled(Box)`
  &&& {
    display: flex;
    flex-direction: column;
    width: 552px;
    height: 218px;

    align-content: center;
  }
`;

const StyledTextField = styled(TextField)`
  &&& {
    width: 520px;
    height: 56px;
    margin-bottom: 32px;
  }
`;
const StyledButton = styled(Button)`
  &&& {
    width: 520px;
    background-color: #2196f3;
    color: #ffffff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

const StyledBottomTypography = styled(Typography)`
  &&& {
    font-family: Roboto;
    margin-top: 16px;
    color: #00000099;
  }
`;

const StyledBottomButton = styled(Button)`
  &&& {
    color: #2196f3;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMissing, setEmailMissing] = useState(false);
  const [passwordMissing, setPasswordMissing] = useState(false);
  const [loggingSuccess, setLoggingSuccess] = useState(false);
  const [loggingError, setLoggingError] = useState(false);

  useEffect(() => {
    socket.on("login", (data) => {
      console.log("login", data);
      if (data === 200) {
        setLoggingSuccess(true);
        //dispatch(loginUser({ email, password }));
        dispatch(setVerifyUser(true));
        navigate("/");
      }
      if (data === 401) {
        // dispatch(addStudentError());
        setLoggingError(true);
      }
    });
  }, [dispatch]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const new_email = event.target.value;
    setEmail(new_email);
    setEmailMissing(email.trim() === "");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const new_password = event.target.value;
    setPassword(new_password);
    setPasswordMissing(password.trim() === "");
  };

  const handleLogin = () => {
    console.log("Login clicked");
    if (email.trim() === "") {
      setEmailMissing(true);
    }
    if (password.trim() === "") {
      setPasswordMissing(true);
    }
    if (email.trim() !== "" && password.trim() !== "") {
      dispatch(loginUser({ email, password }));
      //navigate("/admin");
    }
  };

  const handleRegister = () => {
    console.log("Register Click");
    navigate("/register");
  };

  return (
    <StyledContainer>
      <StyledHeaderBox>
        <StyledTypography variant="h5">Login</StyledTypography>
      </StyledHeaderBox>
      <StyledFormBox>
        <StyledTextField
          label="Email"
          onChange={handleEmailChange}
          error={emailMissing || loggingError}
          helperText={emailMissing ? "Mandatory field is missing" : ""}
        >
          Email
        </StyledTextField>
        <StyledTextField
          label="Password"
          onChange={handlePasswordChange}
          type="password"
          error={passwordMissing || loggingError}
          helperText={
            passwordMissing
              ? "Mandatory field is missing"
              : loggingError
              ? "Invalid email or password"
              : ""
          }
        >
          Password
        </StyledTextField>
        <StyledButton variant="contained" onClick={handleLogin}>
          Login
        </StyledButton>
        <StyledBottomTypography>
          Don’t have an account?{" "}
          <StyledBottomButton onClick={handleRegister}>
            Register Now
          </StyledBottomButton>
        </StyledBottomTypography>
      </StyledFormBox>
    </StyledContainer>
  );
};

export default LoginPage;
