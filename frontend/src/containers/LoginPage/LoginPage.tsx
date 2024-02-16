import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const LoginPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
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
          sx={{ minWidth: isMobile ? "300px" : "400px", paddingLeft: "16px" }}
        >
          <Typography textAlign="start" sx={{ fontSize: "20px" }}>
            Login
          </Typography>
        </Box>
        <Grid item>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl sx={{ minWidth: isMobile ? "300px" : "400px" }}>
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
              <TextField
                fullWidth
                size="small"
                label="Password"
                onChange={handlePasswordChange}
                variant="outlined"
                type="password"
                value={password}
                error={passwordError}
                helperText={passwordError ? "Mandatory field is missing" : null}
                sx={{ marginBottom: "10px" }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
              >
                Login
              </Button>
            </FormControl>
          </form>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing="2px">
            <Typography sx={{ fontSize: "13px" }}>
              Don't have account?
            </Typography>
            <Button
              size="small"
              sx={{
                padding: "0px",
                textTransform: "none",
                color: "rgba(33, 150, 243, 1)",
              }}
            >
              Register now
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
