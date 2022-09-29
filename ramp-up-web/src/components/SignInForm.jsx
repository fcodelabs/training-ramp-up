/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { Form } from "formik";
import SubmitButton from "./SubmitButton";
import TextInputField from "./TextInputField";
import { useNavigate } from "react-router-dom";

export default function SignInForm(props) {
  const { dirty } = props;
  const navigate = useNavigate();
  return (
    <Form>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        padding="10px"
        style={{
          width: "35vw",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          padding="10px"
          style={{ width: "35vw", backgroundColor: "white" }}
        >
          <Grid item xs={8}>
            <TextInputField placeHolder="Enter username" name="username" />
          </Grid>
          <Grid item xs={8}>
            <TextInputField placeHolder="Enter password" name="password" />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          marginBottom="10px"
          style={{ backgroundColor: "white" }}
        >
          <SubmitButton disabled={!dirty} signIn={true} />
          <Button
            style={{ color: "black", marginTop: "10px", fontSize: 12 }}
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
