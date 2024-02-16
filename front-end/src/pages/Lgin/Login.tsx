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
import { useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux"; 
import { socket } from "../../index";

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    setIsEmailEmpty(false);
  };

  const handleLogin = () => {
    if (email === "") {
      setIsEmailEmpty(true);
      setEmailHelperText("Mandotary fields missing");
    }else{
      socket.emit("login", email);
      dispatch(login({email, password}));
    }
  };

  useEffect(() => {
    socket.on("loginStatus", (data: any) => {
      if (data === 200) {
        console.log(user);
        navigate("/home");
      } else {
        setPasswordError(true);
        setPasswordHelperText("Invalid email or password");
      }
    });
  }, [navigate]);

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
            Login
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
                color={isEmailEmpty ? "error" : "primary"}
              >
                Email
              </InputLabel>
              <OutlinedInput
                size="small"
                value={email}
                onChange={handleEmailChange}
                error={isEmailEmpty}
                label="Email"
                id="outlined-email"
              />
              {isEmailEmpty && (
                <FormHelperText error>{emailHelperText}</FormHelperText>
              )}
            </FormControl>
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
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
                onClick={handleLogin}
              >
                Login
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
            Don't have account?
          </Typography>
          <Button
            onClick={() => navigate("/register")}
            size="small"
            sx={{
              padding: "0 2px",
              textTransform: "none",
                fontWeight: "600",
                fontSize: "13px",
              color: "rgba(33, 150, 243, 1)",
            }}
          >
            Register now
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
