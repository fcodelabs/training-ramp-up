import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  IUser,
  ICreatePassword,
  ILoginCredentials,
  IRegisterUser,
  createPassword,
  loginUser,
  registerUser,
  setCurrentUser,
  addUser,
  logoutUser,
  verifyUser,
  setVerifyUser,
} from "../user/slice";
import { PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../../utility/interceptors";

axios.defaults.withCredentials = true;
const apiUrl = "http://localhost:5000/user";
//const apiUrl = "https://ramp-up-backend-epcm.onrender.com/user";
//const apiUrl = "https://backend.ramp-up-epcm.me/user";
const apiUrlAuth = "http://localhost:5000/auth";
//const apiUrlAuth = "https://ramp-up-backend-epcm.onrender.com/auth";
//const apiUrlAuth = "https://backend.ramp-up-epcm.me/auth";
console.log("apiUrl", apiUrl);
console.log("apiUrlAuth", apiUrlAuth);

function* watchCreateUser(
  action: PayloadAction<IUser>
): Generator<any, any, any> {
  const newUser = {
    email: action.payload.email,
    name: action.payload.name,
    role: action.payload.role,
    //password: action.payload.password,
  };
  console.log("newUser create", newUser);
  try {
    yield call(axios.post<IUser>, `${apiUrl}/create`, newUser, {
      withCredentials: true,
    });
  } catch (error: any) {
    return error;
  }
}

function* watchCreatePassword(action: PayloadAction<ICreatePassword>) {
  const { password, token } = action.payload;
  console.log("watch create password", action.payload);
  try {
    yield call(
      axios.post,
      `${apiUrl}/create-password/${token}`,
      { password },
      { withCredentials: true }
    );
  } catch (error: any) {
    console.error("Error creating password:", error);
  }
}

function* watchLoginUser(
  action: PayloadAction<ILoginCredentials>
): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const response = yield call(
      axios.post,
      `${apiUrlAuth}/login`,
      { email, password },
      { withCredentials: true }
    );
    console.log("response", response);
    console.log("response.data", response.data.user);
    yield put(setCurrentUser(response.data.user));
  } catch (error: any) {
    console.error("Error logging in:", error);
  }
}

function* watchLogoutUser() {
  try {
    yield call(axios.post, `${apiUrlAuth}/logout`, { withCredentials: true });
    // Assuming logout is successful, update the state
    // For example, clear user information from the state
    yield put(setCurrentUser(undefined));
    yield put(setVerifyUser(false));
  } catch (error: any) {
    console.error("Error logging out:", error);
  }
}

function* watchRegisterUser(action: PayloadAction<IRegisterUser>) {
  const { name, email, password } = action.payload;
  console.log("watch register", action.payload);
  try {
    yield call(
      axios.post,
      `${apiUrlAuth}/register`,
      { name, email, password },
      { withCredentials: true }
    );
  } catch (error: any) {
    console.error("Error registering user:", error);
  }
}

function* watchVerifyUser(): Generator<any, void, any> {
  try {
    const response = yield call(axiosInstance.post, `${apiUrlAuth}/verify`);
    console.log("response verify", response);
    yield put(setVerifyUser(response.status === 200));
    yield put(setCurrentUser(response.data.user));
  } catch (error: any) {
    console.error("Error verifying user:", error);
  }
}

export function* userSaga() {
  yield takeLatest(addUser.type, watchCreateUser);
  yield takeLatest(createPassword.type, watchCreatePassword);
  yield takeLatest(loginUser.type, watchLoginUser);
  yield takeLatest(logoutUser.type, watchLogoutUser);
  yield takeLatest(registerUser.type, watchRegisterUser);
  yield takeLatest(verifyUser.type, watchVerifyUser);
}
