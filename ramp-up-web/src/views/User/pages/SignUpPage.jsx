import { Grid } from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Image from "../assets/background.jpg";
import * as Yup from "yup";
// import { useStore } from "react-redux";
// import * as actions from "../../../reducer";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

function SignUpPage() {
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
