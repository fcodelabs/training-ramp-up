import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  TextField,
} from "@mui/material";
import { validatePassword } from "../../utility/index";
import { useEffect, useState } from "react";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../index";
import { RootState } from "../../redux/store";
import { registedEmailCheck, registerUser } from "../../redux/slices/userSlice";
import { validateEmail } from "../../utility/index";

const Register = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const registeredEmail = useSelector(
    (state: RootState) => state.user.registedEmail
  );
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("registerUser", (message) => {
      if (message === 201) {
        setIsSuccessOpen(true);
      }
    });
  }, [socket]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(event.target.value);
    if (event.target.value === "") {
      setPasswordError(true);
      setPasswordHelperText("Mandotary fields missing");
    } else if (!validatePassword(event.target.value)) {
      setPasswordError(true);
      setPasswordHelperText("Weak Password");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = () => {
    setNameIsEmpty(false);
    setEmailIsEmpty(false);
    setIsEmailInvalid(false);
    setIsEmailRegistered(false);
    const invalidEmail = !validateEmail(email);
    dispatch(registedEmailCheck(email));
    if (name === "") {
      setNameIsEmpty(true);
    }
    if (email === "") {
      setEmailIsEmpty(true);
    } else if (invalidEmail) {
      setIsEmailInvalid(true);
    } else if (registeredEmail) {
      setIsEmailRegistered(true);
    }
    if (password === "") {
      setPasswordError(true);
      setPasswordHelperText("Mandotary fields missing");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText("Mandotary fields missing");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText("Please make sure your passwords match!");
    }

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      !invalidEmail &&
      !registeredEmail &&
      !passwordError &&
      !confirmPasswordError
    ) {
      socket.emit("register", email);
      dispatch(
        registerUser({
          name: name,
          email: email,
          password: password,
          role: "Observer",
          active: true,
        })
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "552px",
          width: "calc(100% - 40px)",
          height: "450px",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
        }}
      >
        <Box
          sx={{
            height: "32px",
            padding: "16px",
            display: "flex",
            alignContent: "flex-start",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "32px",
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.87)",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Register
          </Typography>
        </Box>
        <form autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              gap: "16px",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameIsEmpty(false);
              }}
              error={nameIsEmpty}
              helperText={nameIsEmpty ? "Mandatory field is missing." : null}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(registedEmailCheck(e.target.value));
                setEmailIsEmpty(false);
                setIsEmailInvalid(false);
                setIsEmailRegistered(false);
              }}
              error={emailIsEmpty || isEmailInvalid || isEmailRegistered}
              helperText={
                emailIsEmpty
                  ? "Mandatory field is missing."
                  : isEmailInvalid
                  ? "Please enter a valid email address."
                  : isEmailRegistered
                  ? "The entered email has already been registered."
                  : null
              }
            />
            <FormControl fullWidth>
              <InputLabel
                size="small"
                htmlFor="outlined-password"
                color={passwordError ? "error" : "primary"}
              >
                Password
              </InputLabel>
              <OutlinedInput
                size="small"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                label="Password"
                id="outlined-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError && (
                <FormHelperText error>{passwordHelperText}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                size="small"
                htmlFor="outlined-confirm-password"
                color={confirmPasswordError ? "error" : "primary"}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                size="small"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                label="Confirm Password"
                id="outlined-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      // onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {confirmPasswordError && (
                <FormHelperText error>
                  {confirmPasswordHelperText}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </form>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Already have an account?
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            size="small"
            sx={{
              padding: "0 2px",
              textTransform: "none",
              fontWeight: "600",
              fontSize: "13px",
              color: "rgba(33, 150, 243, 1)",
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <AlertDialog
        title="Your account has been successfully created."
        buttonText2="OK"
        isOpen={isSuccessOpen}
        handleClickSecondButton={() => {
          setIsSuccessOpen(false);
          navigate("/login");
          setPassword("");
          setConfirmPassword("");
        }}
      />
    </>
  );
};

export default Register;
