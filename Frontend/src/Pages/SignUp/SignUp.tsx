/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

const useStyles = makeStyles({
  box: {
    width: 400,
    padding: 20,
    borderRadius: 10,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  },
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12%",
  },
});

const HeightBox = () => {
  return <Box height="20px" />;
};

function SignUp() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formValues: Values = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(8, "Too Short!"),
    confirmPassword: Yup.string().required("Required").min(8, "Too Short!"),
  });

  const handleSubmit = (values: any) => {
    if (values.password !== values.confirmPassword) return;
    console.log(values);
    navigate("/home");
  };

  return (
    <div className={classes.div}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps: {
          values: Values;
          handleChange: any;
          handleSubmit: () => void;
          errors: any;
          touched: any;
        }) => {
          const { values, handleChange, handleSubmit, errors, touched } =
            formikProps;

          return (
            <Box className={classes.box}>
              <Typography variant="h5" align="center">
                Sign Up
              </Typography>
              <HeightBox />
              <TextField
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
                helperText={touched.email && errors.email ? errors.email : ""}
                error={touched.email && errors.email ? true : false}
                variant="outlined"
                label="Email"
                placeholder="Email"
                fullWidth
              />
              <HeightBox />
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                helperText={
                  touched.password && errors.password ? errors.password : ""
                }
                error={touched.password && errors.password ? true : false}
                variant="outlined"
                label="Password"
                placeholder="Password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <HeightBox />
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                helperText={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : values.password === values.confirmPassword
                    ? ""
                    : "Password does not match"
                }
                error={
                  (touched.confirmPassword && errors.confirmPassword) ||
                  values.password !== values.confirmPassword
                    ? true
                    : false
                }
                variant="outlined"
                label="Confirm Password"
                placeholder="Confirm Password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <HeightBox />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Sign up
              </Button>
              <HeightBox />
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUp;
