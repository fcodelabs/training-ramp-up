import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import userSlice from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const theme = createTheme();

export default function SignUp() {
  // const initialValues = { firstName: "", lastName: "", email: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleChange = (event) => {
  //   console.log(event.target);
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  //   console.log(formValues);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userSlice.actions.insertUser({ name, email, password, navigate }));
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
  //   if (!values.firstName) {
  //     errors.firstName = "First name is required";
  //   }

  //   if (!values.lastName) {
  //     errors.lastName = "Last name is required";
  //   }

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                // value={formValues.name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* <i>
                  <p>{formErrors.firstName}</p>
                </i> */}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // value={formValues.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <i>
                  <p>{formErrors.email}</p>
                </i> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                // value={formValues.password}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
