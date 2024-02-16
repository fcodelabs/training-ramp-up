import { all, fork } from "redux-saga/effects";
import { userSaga } from "./studentSaga";
import { userRoleSaga } from "./userSaga";

export default function* rootSaga() {
  try {
    yield all([fork(userSaga)]);
    yield all([fork(userRoleSaga)]);
  } catch (error: any) {
    throw new Error("Error in rootSaga");
  }
}
