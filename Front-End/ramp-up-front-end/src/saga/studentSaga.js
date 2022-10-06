import {
  addStudentAction,
  deleteStudentAction,
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
} from "../slice/studentSlice";
import {
  deleteStudent,
  getStudent,
  insertStudent,
  updateStudent,
} from "../data/services";
import { takeEvery, call, put } from "redux-saga/effects";

function* addStudentGenerator({ payload }) {
  try {
    const response = yield call(insertStudent, payload);
    if (response) {
      yield put(getStudentAction());
    }
  } catch (err) {
    console.log(err);
  }
}

function* getAllStudentsGenerator() {
  try {
    const response = yield call(getStudent);
    yield put(saveStudentAction(response));
  } catch (err) {
    console.log(err);
  }
}

function* updateStudentGenerator({ payload }) {
  try {
    const response = yield call(updateStudent, payload);
    if (response) {
      yield put(getStudentAction());
    }
  } catch (err) {
    console.log(err);
  }
}

function* deleteStudentGenerator({ payload }) {
  try {
    yield call(deleteStudent, payload);
    yield put(getStudentAction());
  } catch (err) {
    console.log(err);
  }
}

function* allStudents() {
  yield takeEvery(addStudentAction, addStudentGenerator);
  yield takeEvery(getStudentAction, getAllStudentsGenerator);
  yield takeEvery(updateStudentAction, updateStudentGenerator);
  yield takeEvery(deleteStudentAction, deleteStudentGenerator);
}

export default allStudents;
