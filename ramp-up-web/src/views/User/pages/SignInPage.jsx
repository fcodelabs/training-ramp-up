import { Grid } from "@mui/material";
import SignInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Image from "../assets/background.jpg";
// import { useStore } from "react-redux";
// import * as actions from "../../../reducer";

function SignInPage() {
  const navigate = useNavigate();
  // const store = useStore();

  function handleSubmit(values) {
    console.log(values);
    // store.dispatch(actions.addUser({ payload: values.nickName }));
    // localStorage.setItem("user", values.nickName);
    navigate("/students", { replace: true });
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
