import { all } from "redux-saga/effects";

import { userSaga } from "./user/saga";
import { studentSaga } from "./student/saga";

export function* rootSaga() {
  yield all([userSaga(), studentSaga()]);
}
