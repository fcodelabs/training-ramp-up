import { all, fork } from "redux-saga/effects";
import { studentSaga } from "./student/saga";
import { userSaga } from "./user/saga";

export default function* rootSaga() {
  try {
    yield all([fork(studentSaga)]);
    yield all([fork(userSaga)]);
  } catch (error: any) {
    throw new Error("Error in rootSaga");
  }
}
