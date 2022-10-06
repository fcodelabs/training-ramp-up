/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Form } from "formik";
import RoleList from "./RoleList";
import SubmitButton from "./SubmitButton";
import TextInputField from "./TextInputField";

export default function SignUpForm(props) {
  const { dirty } = props;
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
            <RoleList />
          </Grid>
          <Grid item xs={8}>
            <TextInputField placeHolder="Enter password" name="password" />
          </Grid>
          <Grid item xs={8}>
            <TextInputField
              placeHolder="Confirm password"
              name="confirmPassword"
            />
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
          <SubmitButton disabled={!dirty} signIn={false} />
        </Grid>
      </Grid>
    </Form>
  );
}
