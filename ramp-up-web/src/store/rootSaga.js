import { spawn } from "redux-saga/effects";
import { callUserFun } from "../pages/saga/userSaga";
import { callStudentFun } from "../pages/saga/studentSaga";

export default function* rootSaga() {
  yield spawn(callStudentFun);
  yield spawn(callUserFun);
}
