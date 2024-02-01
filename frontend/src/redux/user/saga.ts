//sagas for logging in and out

import { call, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  addNewUser,
  authenticate,
  login,
  loginSuccess,
  logout,
  setNewUserVerification,
  signup,
  updateNewUser,
} from "./slice";
import {
  loginAsync,
  addUsersAsync,
  asyncAuthenticateUser,
  signupUsersAsync,
} from "../../utilities/services";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export function* watchLogin(action: any) {
  try {
    const token: string = yield call(loginAsync, action.payload);
    yield put(loginSuccess(token));
  } catch (error: any) {
    return error;
  }
}

export function* watchLogout() {
  try {
    yield put(logout());
  } catch (error: any) {
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

export function* watchAuthenticate(action: any): Generator<any, void, any>{
  try {
    const token = action.payload;
    yield call(asyncAuthenticateUser, token);
    yield put(loginSuccess(token));
  } catch (error: any) {
    // yield put(logout());
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

export function* userSaga() {
  yield takeLatest(login, watchLogin);
  yield takeLatest(logout, watchLogout);
  yield takeLatest(addNewUser, watchAddNewUser);
  yield takeLatest(authenticate, watchAuthenticate);
  yield takeLeading(signup, watchSignupUser);
}
