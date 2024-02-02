//sagas for logging in and out

import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  addNewUser,
  authenticate,
  login,
  loginFail,
  loginSuccess,
  setNewUserVerification,
  signup,
  register,
  registerSuccess,
} from "./slice";
import {
  loginAsync,
  addUsersAsync,
  asyncAuthenticateUser,
  signupUsersAsync,
  registerUsersAsync,
} from "../../utilities/services";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export function* watchLogin(action: any) {
  try {
    const token: string = yield call(loginAsync, action.payload);
    yield put(loginSuccess(token));
  } catch (error: any) {
    console.log("error", error);
    yield put(loginFail(error));
    return error;
  }
}

export function* watchAddNewUser(action: any): Generator<any, void, any> {
  try {
    const response: any = yield call(addUsersAsync, action.payload);
    yield put(setNewUserVerification(response.isVerified));
  } catch (error: any) {
    return error;
  }
}

export function* watchAuthenticate(action: any): Generator<any, void, any> {
  try {
    const token = action.payload;
    yield call(asyncAuthenticateUser, token);
    yield put(loginSuccess(token));
  } catch (error: any) {
    yield put(loginFail(error));
    return error;
  }
}

export function* watchSignupUser(action: any): Generator<any, void, any> {
  try {
    yield call(signupUsersAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}

export function* watchRegisterUser(action: any): Generator<any, void, any> {
  try {
    const response: any = yield call(registerUsersAsync, action.payload);
    if (response.isVerified) {
      console.log("response.isVerified", response.isVerified);
      yield put(setNewUserVerification(response.isVerified));
    } else {
      yield put(registerSuccess());
    }
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
}

export function* userSaga() {
  yield takeLatest(login, watchLogin);
  yield takeLatest(addNewUser, watchAddNewUser);
  yield takeLatest(authenticate, watchAuthenticate);
  yield takeLatest(signup, watchSignupUser);
  yield takeLatest(register, watchRegisterUser);
}
