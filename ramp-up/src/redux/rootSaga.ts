import { all } from "redux-saga/effects";
import { studentSaga } from "./sagas/studentSaga";
import { userSaga } from "./sagas/userSaga";

export function* rootSaga() {
  yield all([
    studentSaga(),
    userSaga(),
  ]);
}