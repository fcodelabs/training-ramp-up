import { spawn } from "redux-saga/effects";
import { callUserGetFun } from "../pages/saga/userSaga";
import { callStudentFun } from "../pages/saga/studentSaga";

export default function* rootSaga() {
  yield spawn(callUserGetFun);
  yield spawn(callStudentFun);
}
