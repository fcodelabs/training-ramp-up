import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ObserversRegisterPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmPasswordError(false);
    setPasswordError(false);
    setNameError(false);
    setEmailError(false);
    if (name === "") {
      setNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    }

    if (confirmPassword && password) {
      if (confirmPassword !== password) {
        setConfirmPasswordError(true);
        setPasswordError(true);
      } else {
        alert(`Your password has been created!`);
      }
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
        spacing={2}
      >
        <Box
          sx={{ minWidth: isMobile ? "300px" : "400px", marginBottom: "20px" }}
        >
          <Typography textAlign="start" sx={{ fontSize: "20px" }}>
            Register
          </Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid item>
            <TextField
              fullWidth
              size="small"
              label="Name"
              onChange={handleNameChange}
              variant="outlined"
              type="text"
              value={name}
              error={nameError}
              helperText={nameError ? "Mandatory field is missing" : null}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              size="small"
              label="Email"
              onChange={handleEmailChange}
              variant="outlined"
              type="email"
              value={email}
              error={emailError}
              helperText={emailError ? "Mandatory field is missing" : null}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item sx={{ marginBottom: "10px" }}>
            <FormControl sx={{ minWidth: isMobile ? "300px" : "400px" }}>
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                size="small"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
                label="Password"
              />
              {passwordError && (
                <FormHelperText color="error">Password</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item sx={{ marginBottom: "10px" }}>
            <FormControl sx={{ minWidth: isMobile ? "300px" : "400px" }}>
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                size="small"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
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
                label="Confirm Password"
              />
              {confirmPasswordError && (
                <FormHelperText color="error">Confirm Password</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: isMobile ? "300px" : "400px" }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
              >
                Submit
              </Button>
            </FormControl>
          </Grid>
        </form>
        <Grid item>
          <Stack direction="row">
            <Typography sx={{ fontSize: "13px" }}>
              Already have an account?
            </Typography>
            <Button
              size="small"
              sx={{
                padding: "0px",
                textTransform: "none",
                color: "rgba(33, 150, 243, 1)",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ObserversRegisterPage;
