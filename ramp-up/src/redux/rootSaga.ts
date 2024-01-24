import { all } from "redux-saga/effects";
import { studentSaga } from "./sagas/studentSaga";

export function* rootSaga() {
  yield all([studentSaga()]);
}