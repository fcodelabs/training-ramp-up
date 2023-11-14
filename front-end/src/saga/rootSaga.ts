import { all } from "redux-saga/effects";
import { studentSagas } from "./studentSagas";
import { UserSagas } from "./userSagas";

export function* rootSaga() {
  yield all([studentSagas(), UserSagas()]);
}
