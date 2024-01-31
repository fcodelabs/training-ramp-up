import React, { useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { validatePassword } from "../../utilities/validateUser";

const StyledPasswordCreate = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  margin: 10px 0 12px 0 !important;
`;

const StyledPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  min-width: 250px;
  max-width: 500px;
`;

const StyledButton = styled(Button)`
  margin: 10px 0 12px 0 !important;
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0 12px 0 !important;
`;

const PasswordCreate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const handlePasswordChange = (newPassword: any) => {
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError("Weak password");
    } else {
      setPasswordError("");
    }
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Please make sure your passwords match!");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (newConfirmPassword: any) => {
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setPasswordMatchError("Please make sure your passwords match!");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = () => {
    // Handle submission logic here
  };

  return (
    <StyledPasswordCreate>
      <StyledPasswordContainer>
        <StyledTypography
          fontSize={20}
          justifyContent={"flex-start"}
          width={"100%"}
        >
          Create Your Password
        </StyledTypography>
        <StyledTextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          error={!!passwordMatchError}
          helperText={passwordMatchError}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </StyledButton>
      </StyledPasswordContainer>
    </StyledPasswordCreate>
  );
};

export default PasswordCreate;
