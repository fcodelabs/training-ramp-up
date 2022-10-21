import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const RegisterBody = styled.div`
  background-image: linear-gradient(to bottom right, white, blue);
  min-height: 100vh;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* padding-top: 50px; */
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

const RegisterForm = styled.div`
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

const H1Register = styled.h1`
  margin-left: 32px;
  color: blue;
`;

const RegisterErrMsg = styled.span`
  color: red;
`;

function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Please Enter Valid Email").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 Characters Long")
      .matches(/[0-9]/, "Password Requires a Number")
      .matches(/[a-z]/, "Password Requires a Lowercase Letter")
      .matches(/[A-Z]/, "Password Rquires an Uppercase Letter"),
  });
  const onSubmit = (e) => {
    const name = e.name;
    const email = e.email;
    const password = e.password;

    console.log("Name ", name);
    console.log("Email ", email);
    console.log("Password ", password);
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };
  return (
    <RegisterBody>
      <Title>
        <h1>Ramp Up Project</h1>
        <h2>Student Management System</h2>
      </Title>
      <RegisterForm>
        <H1Register>Register</H1Register>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Stack
              component="form"
              sx={{
                width: "50ch",
                marginLeft: "35px",
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <Field
                as={TextField}
                id="name"
                name="name"
                label="Name"
                variant="filled"
                size="small"
                helperText={
                  <ErrorMessage
                    name="name"
                    render={(msg) => <RegisterErrMsg>{msg}</RegisterErrMsg>}
                  />
                }
              />
              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                variant="filled"
                size="small"
                helperText={
                  <ErrorMessage
                    name="email"
                    render={(msg) => <RegisterErrMsg>{msg}</RegisterErrMsg>}
                  />
                }
              />
              <Field
                as={TextField}
                id="password"
                name="password"
                label="Password"
                variant="filled"
                size="small"
                helperText={
                  <ErrorMessage
                    name="password"
                    render={(msg) => <RegisterErrMsg>{msg}</RegisterErrMsg>}
                  />
                }
              />
            </Stack>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                id="registerBtn"
                type="submit"
                style={{
                  width: "432px",
                  marginLeft: "34px",
                  marginTop: "30px",
                }}
              >
                Sign Up
              </Button>
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              marginTop="10px"
              marginLeft={51.5}
            >
              <Button
                variant="text"
                id="redirectToLogin"
                onClick={navigateToLogin}
              >
                Back
              </Button>
            </Stack>
          </Form>
        </Formik>
      </RegisterForm>
    </RegisterBody>
  );
}

export default Register;
