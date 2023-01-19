import { all } from "redux-saga/effects";
import studentSaga from "../components/DataGrid/studentSaga";
import notificationSaga from "./notificationSaga";

export default function* rootSaga() {
  yield all([studentSaga(), notificationSaga()]);
}
