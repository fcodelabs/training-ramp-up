import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import userSlice from "./slice/userSlice";
function SignUp() {
  let navigate = useNavigate();
  const userRef = useRef();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    const lowCaseEmail = email.toLowerCase();
    dispatch(
      userSlice.actions.registerUser({
        user: user,
        password: password,
        email: lowCaseEmail,
        navigate,
      }),
    );
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar>{/* <FaceIcon /> */}</Avatar>
          <h2>Register</h2>
        </Grid>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextField
            id="user"
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

          <TextValidator
            label="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            fullWidth
            variant="standard"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />

          <TextField
            id="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            style={mrstyle}
            value={password}
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={mrstyle}
          >
            Register
          </Button>
          <hr />
          <Button fullWidth href="/">
            Back
          </Button>
        </ValidatorForm>
      </Paper>
    </Grid>
  );
}

export default SignUp;