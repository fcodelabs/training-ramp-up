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
  createPassword,
  login,
  setUserDetails,
  verifyToken,
} from "../slices/userSlice";
axios.defaults.withCredentials = true;

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
    const { data: response } = yield call(
      axios.get<any>,
      `${process.env.REACT_APP_API_URL}/users/check/${action.payload}`
    );
    yield put(setRegistedEmail(response.registeredEmail));
  } catch (error) {
    console.log(error);
  }
}

function* createPasswordSaga(
  action: PayloadAction<{ token: string; password: string }>
): Generator<any, any, any> {
  console.log(action.payload, "createPasswordSaga");
  try {
    yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/createpassword`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
): Generator<any, any, any> {
  try {
    const { data: response } = yield call(
      axios.post<any>,
      `${process.env.REACT_APP_API_URL}/users/login`,
      action.payload
    );
    yield put(setUserDetails(response.userDetails));
  } catch (error) {
    console.log(error);
  }
}

function* verifyTokenSaga(): Generator<any, any, any> {
  try {
    const { data: response } = yield call(
      axios.get<any>,
      `${process.env.REACT_APP_API_URL}/users/verify`
    );
    yield put(setUserDetails(response.userDetails));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchUserSaga() {
  yield takeLatest(addUser.type, addUserSaga);
  yield takeLatest(registedEmailCheck.type, registedEmailCheckSaga);
  yield takeLatest(createPassword.type, createPasswordSaga);
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(verifyToken.type, verifyTokenSaga);
}
