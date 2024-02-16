import { all } from "redux-saga/effects";
import { studentSaga } from "./studentSaga";
import { authSaga } from "./authSaga";


export function* rootSaga() {
  yield all([
    studentSaga(),
    authSaga()
  ]);
}
