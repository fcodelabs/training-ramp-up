import { Grid } from "@mui/material";
import SignInForm from "../components/SignInForm";
import { Formik } from "formik";
import Image from "../assets/background.jpg";
import { useStore, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const store = useStore();
  const token = useSelector(() => store.getState().token);
  const navigate = useNavigate();

  function handleSubmit(values) {
    store.dispatch({ type: "getUser", payload: values });
  }

  useEffect(() => {
    if (token !== null) {
      navigate("/students", { replace: true });
    }
  }, [token]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", backgroundImage: `url(${Image})` }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ dirty }) => <SignInForm dirty={dirty} />}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default SignInPage;
