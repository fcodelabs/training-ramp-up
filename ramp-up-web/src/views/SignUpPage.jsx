import { Grid } from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import { Formik } from "formik";
import Image from "../assets/background.jpg";
import * as Yup from "yup";
import { useStore } from "react-redux";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

function SignUpPage() {
  const store = useStore();

  function handleSubmit(values) {
    store.dispatch({
      type: "addUser",
      payload: values,
    });
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundImage: `url(${Image})` }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ dirty }) => <SignUpForm dirty={dirty} />}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
