import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getLogedUserService,
} from "../../data/userService";
import {
  getUserAction,
  loginUserAction,
  logoutUserAction,
  refreshAction,
  registerUserAction,
  saveUserAction,
} from "./userSlice";

import { takeEvery, call, put } from "redux-saga/effects";

function* registerUserGenerator({ payload }) {
  console.log("payload", payload);
  try {
    const response = yield call(registerUserService, payload);
    console.log("response", response);
    alert("SuccessFully Created Account");
    if (response) {
      payload.navigate("/homeRampUp");
    } else {
      alert("Registration Failed! Please Enter Valid Details");
    }
  } catch (err) {
    console.log(err);
    alert("Registration Failed! Please Enter Valid Details");
  }
}

function* loginUserGenerator({ payload }) {
  try {
    const response = yield call(loginUserService, payload);
    if (response) {
      payload.navigate("/homeRampUp");
    } else {
      alert("Login Failed! Please Enter Valid Email & Password");
    }
  } catch (err) {
    alert("Login Failed! Please Enter Valid Email & Password");
  }
}

function* getLogedUserGenerator() {
  try {
    const response = yield call(getLogedUserService);
    yield put(saveUserAction(response));
  } catch (err) {
    console.log(err);
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
    const response = yield call(getLogedUserService);
    yield put(saveUserAction(response));
  } catch (err) {
    console.log(err);
  }
}

function* allUsers() {
  yield takeEvery(registerUserAction, registerUserGenerator);
  yield takeEvery(loginUserAction, loginUserGenerator);
  yield takeEvery(getUserAction, getLogedUserGenerator);
  yield takeEvery(logoutUserAction, logoutUserGenerator);
  yield takeEvery(refreshAction, refreshGenerator);
}

export default allUsers;
