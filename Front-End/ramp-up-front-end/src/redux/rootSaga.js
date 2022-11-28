import studentSaga from "./student/studentSaga";
import userSaga from "./user/userSaga";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(studentSaga), fork(userSaga)]);
}
