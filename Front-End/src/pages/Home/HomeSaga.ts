/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  upsertStudentAction,
  getStudentsAction,
  setStudentsAction,
  deleteStudentAction,
} from "./HomeSlice";

import { call, put, takeLatest } from "redux-saga/effects";
import { io } from "socket.io-client";
import { getStudents, upsertStudent, deleteStudent } from "./HomeApi";

const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});

function* getStudentsSaga(): any {
  try {
    const students = yield call(getStudents);
    yield put(setStudentsAction(students));
  } catch (error) {
    console.log(error);
  }
}

function* upsertStudentSaga(action: any): any {
  try {
    const response = yield call(upsertStudent, action.payload);
    if (response) {
      socket.emit("student_upsert", "Student upserted");
      yield put(getStudentsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudentSaga(action: any): any {
  try {
    const response = yield call(deleteStudent, action.payload);
    if (response) {
      socket.emit("student_delete", "Student deleted");
      yield put(getStudentsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* homeSaga() {
  yield takeLatest(getStudentsAction.type, getStudentsSaga);
  yield takeLatest(upsertStudentAction.type, upsertStudentSaga);
  yield takeLatest(deleteStudentAction.type, deleteStudentSaga);
}
