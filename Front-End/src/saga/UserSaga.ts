/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  registerUserAction,
  loginUserAction,
  logoutUserAction,
} from "../slice/userSlice";
import { call, takeLatest } from "redux-saga/effects";
import {
  registerUserService,
  loginUserService,
  logoutUserService,
  userDetailsService,
} from "../utils/services";

function* registerUserSaga(action: any): any {
  try {
    const response = yield call(registerUserService, action.payload);
    if (response) {
      window.location.href = "/";
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
    const responseData = yield call(loginUserService, action.payload);
    if (responseData.data.success) {
      const result = yield call(userDetailsService);

      if (result.status === 200) {
        window.location.href = "/home";
        alert("Login successful");
      }
    }
  } catch (error) {
    alert("Incorrect Username or Password");
  }
}

function* logoutUserSaga(): any {
  try {
    const response = yield call(logoutUserService);
    if (response) {
      window.location.href = "/";
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
