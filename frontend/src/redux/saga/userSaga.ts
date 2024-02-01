import { takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUsers, addUsers } from "../slice/userSlice";
import axios from "axios";

function* watchAddNewStudent(
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
      "http://localhost:5000/users/newUser",
      newUser
    );
  } catch (error: any) {
    return error;
  }
}

export function* userRoleSaga() {
  yield takeLatest(addUsers, watchAddNewStudent);
}
