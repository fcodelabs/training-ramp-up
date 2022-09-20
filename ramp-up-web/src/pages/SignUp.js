import { useRef, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";

import React from "react";
import DataTable from "./DataTable";

function SignUp() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

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
    <>
      {success ? (
        <DataTable />
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar>{/* <FaceIcon /> */}</Avatar>
              <h2>Sign Up</h2>
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
                Sign Up
              </Button>
            </form>
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default SignUp;
