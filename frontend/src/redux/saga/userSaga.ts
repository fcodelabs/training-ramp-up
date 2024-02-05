import { takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ILoginCredentials,
  IPasswordToken,
  IRegisterUser,
  IUsers,
  addUsers,
  createUsers,
  loginUsers,
  logoutUsers,
  registerUsers,
} from "../slice/userSlice";
import axios from "axios";
axios.defaults.withCredentials = true;
const apiUrl = process.env.REACT_APP_API_USERS as string;
function* watchSendMail(
  action: PayloadAction<IUsers>
): Generator<any, any, any> {
  const newUser = {
    email: action.payload.email,
    name: action.payload.name,
    role: action.payload.role,
    password: action.payload.password,
  };
  try {
    yield call(axios.post<IUsers>, `${apiUrl}/emailSend`, newUser);
  } catch (error: any) {
    return error;
  }
}

function* watchCreateUser(
  action: PayloadAction<IPasswordToken>
): Generator<any, any, any> {
  const { password, token } = action.payload;
  try {
    yield call(axios.post<IPasswordToken>, `${apiUrl}/newUser`, {
      password,
      token,
    });
  } catch (error: any) {
    return error;
  }
}

function* watchLoginUser(
  action: PayloadAction<ILoginCredentials>
): Generator<any, any, any> {
  const { email, password } = action.payload;
  try {
    yield call(
      axios.post<ILoginCredentials>,
      `${apiUrl}/loginUser`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  } catch (error: any) {
    return error;
  }
}

function* watchLogoutUser(): Generator<any, any, any> {
  try {
    yield call(axios.post, `${apiUrl}/logoutUser`, {
      withCredentials: true,
    });
  } catch (error: any) {
    return error;
  }
}
function* watchRegisterUser(action: PayloadAction<IRegisterUser>) {
  const { name, email, password } = action.payload;
  try {
    yield call(
      axios.post<IRegisterUser>,
      `${apiUrl}/registerUser`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    return error;
  }
}
export function* userRoleSaga() {
  yield takeLatest(addUsers, watchSendMail);
  yield takeLatest(createUsers, watchCreateUser);
  yield takeLatest(loginUsers, watchLoginUser);
  yield takeLatest(logoutUsers, watchLogoutUser);
  yield takeLatest(registerUsers, watchRegisterUser);
}
