import HomeSaga from "../saga/HomeSaga";
import UserSaga from "../saga/UserSaga";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(HomeSaga), fork(UserSaga)]);
}
