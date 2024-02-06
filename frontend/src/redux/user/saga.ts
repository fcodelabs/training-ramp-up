import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  ICreatePassword,
  ILoginCredentials,
  IRegisterUser,
  createPassword,
  loginUser,
  registerUser,
  setUsers,
} from "../user/slice";
import { PayloadAction } from "@reduxjs/toolkit";

axios.defaults.withCredentials = true;
//const apiUrl = process.env.REACT_APP_API_USERS as string;
const apiUrl = "http://localhost:5000/user";
//const apiUrlAuth = process.env.REACT_APP_API_AUTH as string;
const apiUrlAuth = "http://localhost:5000/auth";
console.log("apiUrl", apiUrl);
console.log("apiUrlAuth", apiUrlAuth);

function* watchCreatePassword(action: PayloadAction<ICreatePassword>) {
  const { password, token } = action.payload;
  try {
    yield call(
      axios.post,
      `${apiUrl}/create-password/${token}`,
      { password },
      { withCredentials: true }
    );
    // Assuming create password is successful, update the state
    yield put(createPassword(action.payload));
  } catch (error: any) {
    console.error("Error creating password:", error);
  }
}

function* watchLoginUser(action: PayloadAction<ILoginCredentials>) {
  function* watchLoginUser(
    action: PayloadAction<ILoginCredentials>
  ): Generator<any, void, any> {
    const { email, password } = action.payload;
    try {
      // Call API to login
      const response = yield call(
        axios.post,
        `${apiUrlAuth}/login`,
        { email, password },
        { withCredentials: true }
      );
      // Handle response and update state if necessary
      // For example, store user information in the state
      // yield put(setLoggedInUser(response.data));
    } catch (error: any) {
      console.error("Error logging in:", error);
    }
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
    // Assuming registration is successful, update the state
    // For example, fetch updated user list and set it in the state
    // const users = yield call(fetchUsers);
    // yield put(setUsers(users));
  } catch (error: any) {
    console.error("Error registering user:", error);
  }
}

export function* userSaga() {
  yield takeLatest(createPassword.type, watchCreatePassword);
  yield takeLatest(loginUser.type, watchLoginUser);
  yield takeLatest(registerUser.type, watchRegisterUser);
}
