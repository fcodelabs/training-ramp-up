import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { login, updateUser } from "../../redux/user/slice";
import { Paths } from "../../App";
const StyledPasswordCreate = styled.div`
  position: relative;
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

const Login = () => {
  const email = useAppSelector((state) => state.user.email);
  const password = useAppSelector((state) => state.user.password);
  const [emailError, setEmailError] = useState(false); // Add emailError state
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const LoginError = useAppSelector((state) => state.user.loginError);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const handleEmailChange = (email: any) => {
    dispatch(updateUser({ email })); 
    setEmailError(false); 
    
  };

  const handlePasswordChange = (password: any) => {
    dispatch(updateUser({ password }));
    setPasswordError(false); 
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    dispatch(login({ email, password }));
    if (isLogged) {
      navigate(Paths.HOME);
    }
  };

  return (
    <StyledPasswordCreate>
      <StyledPasswordContainer>
        <StyledTypography fontSize={20} justifyContent={"flex-start"} width={"100%"}>
          Login
        </StyledTypography>
        <StyledTextField
          fullWidth
          placeholder="Email"
          value={email||''}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={emailError || LoginError}
          label="Email"
          helperText={emailError ? "Mandatory field missing" : ""}
        />
        <StyledTextField
          fullWidth
          type="password"
          label="Password"
          placeholder="Password"
          value={password||''}
          onChange={(e) => handlePasswordChange(e.target.value)}
          error={passwordError || LoginError}
          helperText={passwordError ? "Mandatory field missing" : LoginError ? "Invalid email or password" : ""}
        />
        <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
          Login
        </StyledButton>
      </StyledPasswordContainer>
    </StyledPasswordCreate>
  );
};

export default Login;
