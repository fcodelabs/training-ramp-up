import { all } from "redux-saga/effects";
import { studentSagas } from "./studentSagas";

export function* rootSaga() {
  yield all([studentSagas()]);
}
