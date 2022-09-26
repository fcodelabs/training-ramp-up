import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { insertUser } from "../utils/services";
import React from "react";
//import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //const [data, setData] = useState();

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      console.log("Success signUp");
    }
  }, [success]);
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
    //console.log(user, pwd, email);
    const usertoken = await insertUser(user, email, password);
    if (usertoken) {
      setUser("");
      setPassword("");
      setSuccess(true);
    } else {
      alert("Token is not here");
    }
    console.log("user", usertoken);
    //console.log(data);
  };
  return (
    <>
      {success ? (
        // <DataTable />
        navigate("/")
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar>{/* <FaceIcon /> */}</Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
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
              <TextField
                id="email"
                value={email}
                autoComplete="off"
                label="Email"
                placeholder="Enter Email"
                fullWidth
                required
                style={mrstyle}
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
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
