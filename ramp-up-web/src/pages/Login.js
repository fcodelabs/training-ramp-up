import { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
//import DataTable from "./DataTable";
import React from "react";
import { useNavigate } from "react-router-dom";
import { findUser } from "../utils/services";
import loginSlice from "./loginSlice";
import { useDispatch } from "react-redux";
import { userSlice } from "../state/userSlice";
function Login() {
  const userRef = useRef();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  //const [token, setToken] = useState("");
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
    console.log("user", user);
    // dispatch(userSlice.actions.logInUser(user, pwd));

    const res = await findUser(user, pwd);
    if (!res.data) {
      alert("Can you check Email or Password");
      setSuccess(false);
    } else {
      console.log("ress", res.data.user.name);

      setUser("");
      setPwd("");
      const token = res.data.accessToken;
      const name = res.data.user.name;
      dispatch(loginSlice.actions.saveToken({ token: token, name: name }));

      setSuccess(true);
    }
  };
  return (
    <>
      {success ? (
        // <DataTable />

        navigate("/datatable")
      ) : (
        // <Navigate to={"/datatable"} state={{ token }}></Navigate>
        // <div>
        //   <h1>User is here</h1>
        // </div>
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
      )}
    </>
  );
}

export default Login;
