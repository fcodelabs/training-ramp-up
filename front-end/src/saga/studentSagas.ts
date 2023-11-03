import { call, put, takeLatest } from "redux-saga/effects";

import {
  addStudent,
  deleteStudent,
  fetchStudents,
  fetchStudentsSuccess,
  updateStudent,
} from "../redux/studentReducer";
import { apiService } from "./apiService";

function* addStudentSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.addStudent, action.payload);
  } catch (error) {
    console.error("addStudentSaga", error);
  }
}

function* updateStudentSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.updateStudent, action.payload);
  } catch (error) {
    console.error("updateStudentSaga", error);
  }
}

function* deleteStudentSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.deleteStudent, action.payload);
  } catch (error) {
    console.error("deleteStudentSaga", error);
  }
}

function* getStudentSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(apiService.getStudents);
    yield put(fetchStudentsSuccess(response.data));
  } catch (error) {
    console.error("getStudentSaga", error);
  }
}

export function* studentSagas() {
  yield takeLatest(addStudent, addStudentSaga);
  yield takeLatest(updateStudent, updateStudentSaga);
  yield takeLatest(deleteStudent, deleteStudentSaga);
  yield takeLatest(fetchStudents, getStudentSaga);
}

export {};
