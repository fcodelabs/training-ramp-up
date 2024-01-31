//sagas for logging in and out

import { call, put, takeLatest } from "redux-saga/effects";
import { addNewUser, login, logout, updateNewUser } from "./slice";
import { loginAsync, addUsersAsync } from "../../utilities/services";

export function* watchLogin(action: any) {
  try {
    const token: string = yield call(loginAsync, action.payload);
    yield put(login(token));
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
    const respond: any = yield call(addUsersAsync, action.payload);
    if (respond.status === 200 && respond.data.verified === true) {
      yield put(updateNewUser({ isVerifiedUser: true }));
    }
  } catch (error: any) {
    return error;
  }
}

export function* userSaga() {
  yield takeLatest(login, watchLogin);
  yield takeLatest(logout, watchLogout);
  yield takeLatest(addNewUser, watchAddNewUser);
}
