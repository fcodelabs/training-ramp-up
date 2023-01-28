/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, put, call } from "redux-saga/effects";
import { User } from "../../utils/interface";
import axios from "../../axios";
import { signUp, signUpSuccess, signUpFailure } from "../SignIn/signInSlice";
import { useNavigate } from "react-router-dom";

interface Action {
  type: string;
  payload: User;
}

function* signUpUser(action: Action): Generator<any, any, any> {
  try {
    const response = yield call(() =>
      axios.post("user/signup", action.payload)
    );
    const user: User = response.data.user;
    yield put(signUpSuccess(user));
    useNavigate()("/home");
  } catch (error: any) {
    const err = error.response.data.err;
    yield put(signUpFailure(err));
  }
}

function* signInSaga() {
  yield takeEvery(signUp, signUpUser);
}

export default signInSaga;
