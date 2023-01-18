import { take, takeEvery, put, call, cancelled } from "redux-saga/effects";
import { User } from "../components/interface";
import axios from "../axios";
import {
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  addStudent,
  addStudentSuccess,
  addStudentFailure,
} from "./homeSlice";

function* getStudentsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(() => axios.get("student"));
    const students: User[] = response.data;
    const modified = students.map((student) => {
      return {
        ...student,
        inEdit: false,
      };
    });
    yield put(getStudentsSuccess(modified));
  } catch (error) {
    yield put(getStudentsFailure(error));
  }
}

function* addStudentSaga(action: any): Generator<any, any, any> {
  try {
    console.log("start saga", action.payload);
    const response = yield call(() => axios.post("student", action.payload));
    const student: User = response.data;
    console.log(student);
    yield put(addStudentSuccess(student));
  } catch (error) {
    yield put(addStudentFailure(error));
  }
}

function* homeSaga() {
  yield takeEvery(getStudents, getStudentsSaga);
  yield takeEvery(addStudent, addStudentSaga);
}

export default homeSaga;
