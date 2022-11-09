import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from "../data/userService";
import {
  loginUserAction,
  logoutUserAction,
  refreshAction,
  registerUserAction,
  saveUserAction,
} from "../slice/userSlice";

import { takeEvery, call, put } from "redux-saga/effects";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function* registerUserGenerator({ payload }) {
  console.log("payload", payload);
  try {
    const response = yield call(registerUserService, payload);
    console.log("response", response);
    alert("SuccessFully Created Account");
    if (response) {
      const signedUser = cookies.get("logedUser");

      yield put(saveUserAction(signedUser));
      payload.navigate("/homeRampUp");
    } else {
      alert("Registration Failed! Please Enter Valid Details");
    }
  } catch (err) {
    console.log(err);
  }
}

function* loginUserGenerator({ payload }) {
  try {
    const response = yield call(loginUserService, payload);
    if (response) {
      const signedUser = cookies.get("logedUser");
      yield put(saveUserAction(signedUser));
      payload.navigate("/homeRampUp");
    } else {
      alert("Login Failed! Please Enter Valid Email & Password");
    }
  } catch (err) {
    alert("Login Failed! Please Enter Valid Email & Password");
  }
}

function* logoutUserGenerator({ payload }) {
  try {
    const response = yield call(logoutUserService);
    if (response) {
      payload.navigate("/");
    } else {
      alert("Your Session is Expired");
      payload.navigate("/");
    }
  } catch (err) {
    console.log(err);
  }
}

function* refreshGenerator() {
  try {
    const signedUser = yield cookies.get("logedUser");
    yield put(saveUserAction(signedUser));
  } catch (err) {
    console.log(err);
  }
}

function* allUsers() {
  yield takeEvery(registerUserAction, registerUserGenerator);
  yield takeEvery(loginUserAction, loginUserGenerator);
  yield takeEvery(logoutUserAction, logoutUserGenerator);
  yield takeEvery(refreshAction, refreshGenerator);
}

export default allUsers;
