import HomeSaga from "../saga/homeSaga";
import UserSaga from "../saga/userSaga";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(HomeSaga), fork(UserSaga)]);
}
