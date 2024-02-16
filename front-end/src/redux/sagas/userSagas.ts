import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  User,
  newUser,
} from "../../components/AddNewUserDialog/AddNewUserDialog";
import {
  addUser,
  registedEmailCheck,
  setRegistedEmail,
} from "../slices/userSlice";

function* addUserSaga(
  action: PayloadAction<newUser>
): Generator<any, any, any> {
  try {
    yield call(
      axios.post<newUser>,
      `${process.env.REACT_APP_API_URL}/users/adduser`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* registedEmailCheckSaga(
  action: PayloadAction<string>
): Generator<any, any, any> {
  try {
    const { data: response, status: s } = yield call(
      axios.get<any>,
      `${process.env.REACT_APP_API_URL}/users/check/${action.payload}`
    );
    yield put(setRegistedEmail(response.registeredEmail));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchUserSaga() {
  yield takeLatest(addUser.type, addUserSaga);
  yield takeLatest(registedEmailCheck.type, registedEmailCheckSaga);
}
