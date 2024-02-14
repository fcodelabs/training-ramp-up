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

axios.defaults.withCredentials = true;
//const apiUrl = process.env.REACT_APP_API_USERS as string;
const apiUrl = "https://ramp-up-backend1-epcm.onrender.com/user";
//const apiUrlAuth = process.env.REACT_APP_API_AUTH as string;
const apiUrlAuth = "https://ramp-up-backend1-epcm.onrender.com/auth";
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
    // Assuming create password is successful, update the state
    //yield put(createPassword(action.payload));
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

    // Handle response and update state if necessary
    // For example, store user information in the state
    // yield put(setLoggedInUser(response.data));
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
    // Assuming registration is successful, update the state
    // For example, fetch updated user list and set it in the state
    // const users = yield call(fetchUsers);
    // yield put(setUsers(users));
  } catch (error: any) {
    console.error("Error registering user:", error);
  }
}

function* watchVerifyUser(): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, `${apiUrlAuth}/verify`, {
      withCredentials: true,
    });
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
