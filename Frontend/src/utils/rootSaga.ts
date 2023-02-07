import { all } from "redux-saga/effects";
import homeSaga from "../Pages/Home/homeSaga";
import signInSaga from "../Pages/SignIn/signInSaga";
import signUpSaga from "../Pages/SignUp/signUpSaga";

export default function* rootSaga() {
  yield all([homeSaga(), signInSaga(), signUpSaga()]);
}
