import { all } from "redux-saga/effects";
import homeSaga from "../pages/Home/homeSaga";
import signInSaga from "../pages/SignIn/signInSaga";
import signUpSaga from "../pages/SignUp/signUpSaga";

export default function* rootSaga() {
  yield all([homeSaga(), signInSaga(), signUpSaga()]);
}
