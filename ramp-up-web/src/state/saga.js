import { clearAllListeners } from "@reduxjs/toolkit";
import { takeEvery } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";
import { userSlice } from "./userSlice";
import { findUser } from "../utils/services";

function* userGetFun(payload) {
  let res = yield call(findUser, payload);
  console.log("Response", res);
}

export function* rootSaga() {
  yield takeEvery(userSlice.logInUser, userGetFun);
}
