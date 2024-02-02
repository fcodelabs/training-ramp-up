import { takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IPasswordToken,
  IUsers,
  addUsers,
  createUsers,
} from "../slice/userSlice";
import axios from "axios";

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
    yield call(
      axios.post<IUsers>,
      "http://localhost:5000/users/emailSend",
      newUser
    );
  } catch (error: any) {
    return error;
  }
}

function* watchCreateUser(
  action: PayloadAction<IPasswordToken>
): Generator<any, any, any> {
  const { password, token } = action.payload;
  try {
    yield call(
      axios.post<IPasswordToken>,
      "http://localhost:5000/users/newUser",
      { password, token }
    );
  } catch (error: any) {
    return error;
  }
}
export function* userRoleSaga() {
  yield takeLatest(addUsers, watchSendMail);
  yield takeLatest(createUsers, watchCreateUser);
}
