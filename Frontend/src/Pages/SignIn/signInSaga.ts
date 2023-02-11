/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, put, call } from "redux-saga/effects";
import { User } from "../../utils/interface";
import { toast } from "react-toastify";
import axios from "../../axios";
import {
  signIn,
  signInSuccess,
  signInFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} from "./signInSlice";
import { setLoginDetailsToLocalStorage } from "../../utils/services";

interface Action {
  type: string;
  payload: User;
}

function* signInUser(action: Action): Generator<any, any, any> {
  try {
    const response = yield call(() =>
      axios.post("user/signin", action.payload)
    );
    const user: User = response.data.user;
    setLoginDetailsToLocalStorage(user.role, true, user.email);
    yield put(signInSuccess(user));
    window.location.href = "/home";
  } catch (error: any) {
    const err = error.response.data.err;
    yield put(signInFailure({ type: "signIn", message: err }));
  }
}

function* logoutUser(): Generator<any, any, any> {
  try {
    yield call(() => axios.delete("user/signout"));
    setLoginDetailsToLocalStorage("", false, "");
    yield put(logoutSuccess());
  } catch (error: any) {
    const err = error.response.data.err;
    toast.error("Logout failed. Please try again later.");
    yield put(logoutFailure({ type: "logout", message: err }));
  }
}

function* signInSaga() {
  yield takeEvery(signIn, signInUser);
  yield takeEvery(logout, logoutUser);
}

export default signInSaga;
