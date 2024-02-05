
import { call, put, takeLatest } from "redux-saga/effects";
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
  logout,
  logoutSuccess,
} from "./slice";
import {
  loginAsync,
  addUsersAsync,
  asyncAuthenticateUser,
  signupUsersAsync,
  registerUsersAsync,
  logoutAsync,
} from "../../utilities/services";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export function* watchLogin(action: any) {
  try {
    const data: string = yield call(loginAsync, action.payload);
    console.log("data", data);
    yield put(loginSuccess(data));
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

export function* watchAuthenticate(): Generator<any, void, any>{
  try {
    const data: any = yield call(asyncAuthenticateUser);
    yield put(loginSuccess(data));
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
      yield put(setNewUserVerification(response.isVerified));
    } else {
      yield put(registerSuccess());
    }
  } catch (error: any) {
    return error;
  }
}

export function* watchLogoutUser() {
  try {
    yield call(logoutAsync);
    yield put(logoutSuccess());
  } catch (error: any) {
    return error;
  }
}


export function* userSaga() {
  yield takeLatest(login, watchLogin);
  yield takeLatest(addNewUser, watchAddNewUser);
  yield takeLatest(authenticate, watchAuthenticate);
  yield takeLatest(signup, watchSignupUser);
  yield takeLatest(register, watchRegisterUser);
  yield takeLatest(logout, watchLogoutUser);
}
