import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import userSlice from "../features/userSlice";
import { useNavigate } from "react-router-dom";
// import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function MadeWithLove() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
    ></Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  let navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPaaswordChanged = (e) => setPassword(e.target.value);
  const onSavePostClicked = () => {
    if (name && email && password) {
      const emailCond =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const cond1 = /^(?=.*[a-z]).{6,20}$/;
      const cond2 = /^(?=.*[A-Z]).{6,20}$/;
      const cond3 = /^(?=.*[0-9]).{6,20}$/;
      if (
        email.match(emailCond) &&
        password.length > 6 &&
        password.length < 20 &&
        password.match(cond1) &&
        password.match(cond2) &&
        password.match(cond3)
      ) {
        dispatch(
          userSlice.actions.addUser({ name, email, password, navigate })
        );
        console.log("email password", email, password);

        alert("User Registered");
        setName("");
        setEmail("");
        setPassword("");
      } else if (password.length > 6 && password.length < 20) {
        alert("Please enter valid email");
      } else if (
        !(
          password.match(cond1) &&
          password.match(cond2) &&
          password.match(cond3)
        )
      ) {
        alert(
          "Paasord must Be include least a capital letter,at least a number,least one lowercase"
        );
      } else {
        alert("Email must be valid");
      }
    } else if (!name) {
      alert("All Field Must Be fill");
    } else if (!email) {
      alert("All Field Must Be fill");
    } else if (!password) {
      alert("All Field Must Be fill");
    } else {
      console.log("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                onChange={onNameChanged}
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onEmailChanged}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onPaaswordChanged}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSavePostClicked}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
