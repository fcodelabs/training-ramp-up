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
} from "@mui/material";
import { validatePassword } from "../../utility/index";
import { useEffect, useState } from "react";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPassword } from "../../redux/slices/userSlice";
import { socket } from "../../index";

const PasswordCreation = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLinkExpiredOpen, setIsLinkExpiredOpen] = useState(false);
  const URLParams = new URLSearchParams(useLocation().search);
  const token = URLParams.get("token");
  const navigate = useNavigate();


  useEffect(() => {
    socket.on("createPassword", (message) => {
      if(message === 201){
        setIsSuccessOpen(true);
      }else{
        setIsLinkExpiredOpen(true);
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
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      dispatch(createPassword({ token: token as string, password: password }));
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "552px",
          width: "calc(100% - 40px)",
          height: "282px",
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
            Create your password
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
      <AlertDialog
        title="The link has expired."
        buttonText2="OK"
        isOpen={isLinkExpiredOpen}
        handleClickSecondButton={() => {
          setIsLinkExpiredOpen(false);
          navigate("/login");
        }}
      />
    </>
  );
};

export default PasswordCreation;
