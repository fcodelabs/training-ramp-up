import { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";

function Login() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const mrstyle = {
    margin: "10px 0",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar>{/* <FaceIcon /> */}</Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            ref={userRef}
            value={user}
            autoComplete="off"
            label="User Name"
            placeholder="Enter User Name"
            fullWidth
            required
            style={mrstyle}
            variant="standard"
            onChange={(e) => setUser(e.target.value)}
          ></TextField>
          <TextField
            id="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            style={mrstyle}
            value={pwd}
            variant="standard"
            onChange={(e) => setPwd(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={mrstyle}
          >
            Sign in
          </Button>
        </form>

        <Typography>
          <p>
            {" "}
            Need an Account?
            <br />
            <span>
              <a href="/sign">Sign Up</a>
            </span>
          </p>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
