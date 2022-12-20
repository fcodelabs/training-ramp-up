/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addStudentAction,
  updateStudentAction,
  getStudentsAction,
  setStudentsAction,
  deleteStudentAction,
} from "../slice/HomeSlice";

import { call, put, takeLatest } from "redux-saga/effects";
// import { io } from "socket.io-client";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../utils/Services";
import { Student } from "../utils/Interfaces/Student";

// const socket = io("http://localhost:8000/", {
//   transports: ["websocket"],
// });

function* getStudentsSaga(): any {
  try {
    const result = yield call(getStudents);
    const students: Student[] = result.data.map((temp: Student) => ({
      inEdit: false,
      ...temp,
    }));
    yield put(setStudentsAction(students));
  } catch (error) {
    console.log(error);
  }
}

function* addStudentSaga(action: any): any {
  try {
    const response = yield call(addStudent, action.payload);
    if (response) {
      // socket.emit("student_add", "Student added");
      yield put(getStudentsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateStudentSaga(action: any): any {
  try {
    const response = yield call(updateStudent, action.payload);
    if (response) {
      // socket.emit("student_update", "Student updated");
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
      // socket.emit("student_delete", "Student deleted");
      yield put(getStudentsAction());
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* homeSaga() {
  yield takeLatest(getStudentsAction.type, getStudentsSaga);
  yield takeLatest(updateStudentAction.type, updateStudentSaga);
  yield takeLatest(addStudentAction.type, addStudentSaga);
  yield takeLatest(deleteStudentAction.type, deleteStudentSaga);
}
