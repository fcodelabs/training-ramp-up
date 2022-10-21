import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const LoginBody = styled.div`
  background-image: linear-gradient(to bottom right, white, blue);
  min-height: 100vh;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;

  @media (max-width: 768px) {
    display: block;
    padding-top: 50px;
  }
`;

const Title = styled.div`
  color: #030381;
  text-align: center;
  font-size: 20pt;
  font-style: italic;
  margin-left: 70px;

  @media (max-width: 1024px) {
    margin-left: 0px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 14pt;
    margin-top: -50px;
    margin-right: 0;
  }
`;

const LoginForm = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
  align-items: center;
  margin: auto;
  margin-top: 70px;
  padding-top: 25px;

  @media (max-width: 1024px) {
    margin-right: 40px;
    padding-right: 20px;
  }

  @media (max-width: 768px) {
    margin-top: 0px;
    height: 450px;
    margin: auto;
    padding-right: 0;
  }
`;

const H1Login = styled.h1`
  margin-left: 32px;
  color: blue;
`;

const LogErrMsg = styled.span`
  color: red;
`;

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("Please Enter Valid Email").required("Required"),
    password: yup.string().required("Required"),
  });
  const onSubmit = (e) => {
    const email = e.email;
    const password = e.password;

    console.log("Email ", email);
    console.log("Password ", password);
  };

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <LoginBody>
      <Title>
        <h1>Ramp Up Project</h1>
        <h2>Student Management System</h2>
      </Title>
      <LoginForm>
        <H1Login>Login</H1Login>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "50ch", marginLeft: "35px" },
              }}
              noValidate
              autoComplete="off"
            >
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                variant="filled"
                helperText={
                  <ErrorMessage
                    name="email"
                    render={(msg) => <LogErrMsg>{msg}</LogErrMsg>}
                  />
                }
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="filled"
                helperText={
                  <ErrorMessage
                    name="password"
                    render={(msg) => <LogErrMsg>{msg}</LogErrMsg>}
                  />
                }
              />
            </Box>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                id="loginBtn"
                type="submit"
                style={{
                  width: "432px",
                  marginLeft: "34px",
                  marginTop: "20px",
                }}
              >
                Sign In
              </Button>
            </Stack>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                id="redirectRegisterBtn"
                onClick={navigateToRegister}
                style={{
                  width: "432px",
                  marginLeft: "34px",
                  marginTop: "20px",
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Form>
        </Formik>
      </LoginForm>
    </LoginBody>
  );
}

export default Login;
