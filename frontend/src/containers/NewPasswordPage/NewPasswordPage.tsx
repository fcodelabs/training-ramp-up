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
import React, { useState } from "react";
import styled from "@mui/system/styled";
import "@fontsource/roboto";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import isPasswordValid from "../../utility/passwordValidator";
import MessageCard from "../../components/Cards/MessageCard";

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

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMissing, setPasswordMissing] = useState(false);
  const [confirmPasswordMissing, setConfirmPasswordMissing] = useState(false);
  const [passwordMissMatch, setPasswordMissMatch] = useState(false);
  const [passwordInValid, setPasswordInValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [successMessageCardModal, setSuccessMessageCardModal] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const new_password = e.target.value;

    setPassword(new_password);
    setPasswordInValid(!isPasswordValid(password));
    console.log("password", password);

    setPasswordMissing(password.trim() === "");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const new_confirmPassword = e.target.value;
    setConfirmPassword(new_confirmPassword);
    setConfirmPasswordMissing(confirmPassword.trim() === "");
  };

  const handleSubmit = () => {
    if (password.trim() === "") {
      setPasswordMissing(true);
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordMissing(true);
    }
    if (password !== confirmPassword) {
      setPasswordMissMatch(true);
    }
    setSuccessMessageCardModal(true);
  };

  return (
    <StyledContainer>
      <StyledHeaderBox>
        <StyledTypography variant="h5">Create Your Password</StyledTypography>
      </StyledHeaderBox>
      <StyledFormBox>
        <StyledTextField
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordChange}
          error={passwordMissing || passwordInValid}
          helperText={
            passwordMissing
              ? "Password is required"
              : passwordInValid
              ? "Weak Password"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordMissing || passwordMissMatch}
          helperText={
            confirmPasswordMissing
              ? "Confirm Password is required"
              : passwordMissMatch
              ? "Password does not match"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPassword}>
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          Confirm Password
        </StyledTextField>
        <StyledButton variant="contained" onClick={handleSubmit}>
          Submit
        </StyledButton>
      </StyledFormBox>
      {successMessageCardModal && (
        <Modal
          open={successMessageCardModal}
          //onClose={setSuccessMessageCardModal(false)}
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
            <MessageCard
              message="Your account has been successfully created."
              primaryButton={{
                text: "OK",
                onClick: () => setSuccessMessageCardModal(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}
    </StyledContainer>
  );
};

export default NewPasswordPage;
