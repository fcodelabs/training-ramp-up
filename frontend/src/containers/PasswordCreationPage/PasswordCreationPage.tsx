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
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

const PasswordCreationPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmPasswordError(false);
    setPasswordError(false);

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
            Create your password
          </Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              {passwordError && <FormHelperText>Password</FormHelperText>}
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
                <FormHelperText>Confirm Password</FormHelperText>
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
      </Grid>
    </>
  );
};

export default PasswordCreationPage;
//validation part is not done yet
