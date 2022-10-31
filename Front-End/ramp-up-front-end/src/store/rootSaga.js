import studentSaga from "../saga/studentSaga";
import userSaga from "../saga/userSaga";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(studentSaga), fork(userSaga)]);
}
