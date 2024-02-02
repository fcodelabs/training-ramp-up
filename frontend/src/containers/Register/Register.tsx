import { useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";
import {
  register,
  updateNewUser,
} from "../../redux/user/slice";
import { Paths } from "../../App";
import {
  isValidEmail,
  isValidName,
  validatePassword,
} from "../../utilities/validateUser";
import NotificationPopup from "../../components/Notification/Notification";
import { NotificationTypes } from "../../utilities";

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

const Register = () => {
  const user = useAppSelector((state) => state.user.newUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [EmailEmptyError, setEmailEmptyError] = useState(false);
  const [PasswordEmptyError, setPasswordEmptyError] = useState(false);
  const [NameEmptyError, setNameEmptyError] = useState(false);
  const [PasswordComfirmEmptyError, setPasswordComfirmEmptyError] =
    useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const isEmailValidated = isValidEmail(user.email);
  const isEmailTaken = user.isVerifiedUser;
  const isEmailOk = isEmailValidated && !isEmailTaken;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNewUser({ [event.target.name]: event.target.value }));
    setEmailEmptyError(false);
    setPasswordEmptyError(false);
    setNameEmptyError(false);
    setPasswordComfirmEmptyError(false);
  };
  const handleConfirmPasswordChange = (newConfirmPassword: any) => {
    setConfirmPassword(newConfirmPassword);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, onConfirm: () => {}, type: "" });
    navigate(Paths.LOGIN);
  };

  useEffect(() => {
    if (user.registered) {
      setNotification({
        open: true,
        type: NotificationTypes.SUCCESS_REGISTER_OBSERVER,
        onConfirm: () => {},
      });
    }
  }, [user.registered]);

  const handleSubmit = () => {
    if (!user.email) {
      setEmailEmptyError(true);
    }
    if (!user.password) {
      setPasswordEmptyError(true);
    }
    if (!user.name) {
      setNameEmptyError(true);
    }
    if (!confirmPassword) {
      setPasswordComfirmEmptyError(true);
    }

    const ok =
      validatePassword(user.password) &&
      confirmPassword === user.password &&
      isEmailOk &&
      isValidName(user.name) &&
      user.name !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      confirmPassword !== "";
    if (ok) {
      dispatch(register(user));
    }
  };

  return (
    <StyledPasswordCreate>
      <StyledPasswordContainer>
        <StyledTypography
          fontSize={20}
          justifyContent={"flex-start"}
          width={"100%"}
          fontWeight={500}
        >
          Register
        </StyledTypography>
        <StyledTextField
          fullWidth
          label="Name"
          error={!isValidName(user.name) || NameEmptyError}
          onChange={handleChange}
          value={user.name}
          name="name"
          helperText={
            NameEmptyError
              ? "Mandatory field missing"
              : !isValidName(user.name)
                ? "Invalid Name"
                : ""
          }
        >
          Name
        </StyledTextField>
        <StyledTextField
          fullWidth
          label="Email"
          error={!isEmailOk || EmailEmptyError}
          onChange={handleChange}
          value={user.email}
          name="email"
          helperText={
            isEmailTaken
              ? "The entered email has already been registered. "
              : !isValidEmail(user.email)
                ? "Please enter a valid email address. "
                : EmailEmptyError
                  ? "Mandatory field missing"
                  : ""
          }
        >
          Email
        </StyledTextField>
        <StyledTextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          label="Password"
          value={user.password}
          onChange={handleChange}
          error={!validatePassword(user.password) || PasswordEmptyError}
          helperText={
            !validatePassword(user.password)
              ? "Weak password"
              : PasswordEmptyError
                ? "Mandatory field missing"
                : ""
          }
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
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          error={confirmPassword !== user.password || PasswordComfirmEmptyError}
          helperText={
            confirmPassword !== user.password
              ? "Please make sure your passwords match!"
              : PasswordComfirmEmptyError
                ? "Mandatory field missing"
                : ""
          }
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
          Register
        </StyledButton>
        <StyledTypography>
          Already have an account?{" "}
          <a href={Paths.LOGIN} style={{ color: "blue" }}>
            Login
          </a>
        </StyledTypography>
      </StyledPasswordContainer>
      <NotificationPopup
        open={notification.open}
        onClose={handleCloseNotification}
        type={notification.type}
        onSubmit={notification.onConfirm}
      />
    </StyledPasswordCreate>
  );
};

export default Register;
