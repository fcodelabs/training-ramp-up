import { spawn } from "redux-saga/effects";
import { callUserGetFun } from "../pages/saga/userSaga";

export default function* rootSaga() {
  yield spawn(callUserGetFun);
}
