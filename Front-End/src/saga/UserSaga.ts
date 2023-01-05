/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  registerUserAction,
  loginUserAction,
  logoutUserAction,
} from "../slice/UserSlice";
import { call, takeLatest } from "redux-saga/effects";
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from "../utils/Services";

function* registerUserSaga(action: any): any {
  try {
    const response = yield call(registerUserService, action.payload);
    if (response) {
      window.location.href = "/signin";
      alert("Registration successful");
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.log(error);
  }
}

function* loginUserSaga(action: any): any {
  try {
    const response = yield call(loginUserService, action.payload);
    if (response) {
      window.location.href = "/";
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutUserSaga(): any {
  try {
    const response = yield call(logoutUserService);
    if (response) {
      window.location.href = "/signin";
      alert("Logout successful");
    } else {
      alert("Logout failed");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* UserSaga() {
  yield takeLatest(registerUserAction.type, registerUserSaga);
  yield takeLatest(loginUserAction.type, loginUserSaga);
  yield takeLatest(logoutUserAction.type, logoutUserSaga);
}
