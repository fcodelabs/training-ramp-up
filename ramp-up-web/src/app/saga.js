import StudentSlice from "../features/studentSlice";
import { all, takeEvery } from "redux-saga/effects";
import {
  insertStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../utils/services";

// eslint-disable-next-line no-unused-vars
function* WatchStudentAdded({ payload: post }) {
  try {
    yield insertStudent;
    yield deleteStudent;
    yield getStudents;
    yield updateStudent;
  } catch (error) {
    console.log(error);
  }
}

// eslint-disable-next-line no-unused-vars
function* WatchloadStudent({ payload: post }) {}

//done
export function* postSagas() {
  yield takeEvery(StudentSlice.actions.StudentAdd, WatchStudentAdded);
  yield takeEvery(StudentSlice.actions.loadStudent, WatchloadStudent);
}

//done
export default function* rootSaga() {
  yield all([...postSagas()]);
}
