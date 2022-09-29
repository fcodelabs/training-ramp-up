import { all, fork } from "redux-saga/effects";
import studentSaga from "./studentSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([fork(studentSaga), fork(userSaga)]);
}
