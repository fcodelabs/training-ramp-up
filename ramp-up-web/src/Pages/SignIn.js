import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userSlice from "../redux/slice/userSlice";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  // const initialValues = { email: "", password: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // // const handleChange = (event) => {
  // //   console.log(event.target);
  // //   const { name, value } = event.target;

  //   setFormValues({ ...formValues, [name]: value });
  //   console.log(formValues);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email.match(regex)) {
      console.log("Email Done");
      event.preventDefault();
      dispatch(userSlice.actions.signInUser({ email, password, navigate }));

      // if(successLog){
      //   setEmail("");
      //   setPassword("");
      // }

      // const data = new FormData(event.currentTarget);
      // console.log({
      //   email: data.get("email"),
      //   password: data.get("password"),
      // });
    }
  };
  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 characters!";
  //   }
  //   return errors;
  // };

  


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            // onSubmit={handleSubmit}
          >
             <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                // onBlur={handleSubmit}
                // value={formValues.email}
                onChange={(e) => setEmail(e.target.value)}
                // onChange={handleChange}
              />
              {/* <i>{formErrors.email}</i> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // value={formValues.password}
                // onChange={handleChange}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i>{/* <p>{formErrors.password}</p> */}</i>
            </Grid>
            < Grid item xs={12}></Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
