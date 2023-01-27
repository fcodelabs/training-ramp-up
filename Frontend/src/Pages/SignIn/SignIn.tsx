/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Values {
  email: string;
  password: string;
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

function SignIn() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const formValues: Values = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(8, "Too Short!"),
  });

  const handleSubmit = (values: any) => {
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
                Sign In
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Sign In
              </Button>
              <HeightBox />
              <Typography variant="body2" align="center">
                Do not have an account ? <Link to={"/signup"}>SignUp</Link>
              </Typography>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignIn;
