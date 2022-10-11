import studentSlice from "../slice/studentSlice";
import { takeEvery, put, call } from "redux-saga/effects";
import {
  getStudents,
  updateStudent,
  deleteStudent,
  insertStudent,
} from "../../utils/studentServices";

function* callstudentGetFun() {
  try {
    const res = yield call(getStudents);

    yield put(studentSlice.actions.addStudent(res));
  } catch (e) {
    console.log(e);
  }
}
function* callstudentUpdateFun({ payload: payload }) {
  try {
    yield call(updateStudent, payload);
    yield put(studentSlice.actions.getStudents());
  } catch (e) {
    console.log(e);
  }
}
function* callstudentDeleteFun({ payload: payload }) {
  try {
    yield call(deleteStudent, payload);
    yield put(studentSlice.actions.getStudents());
  } catch (e) {
    console.log(e);
  }
}
function* callstudentAddFun({ payload: payload }) {
  try {
    yield call(insertStudent, payload);
    yield put(studentSlice.actions.getStudents());
  } catch (e) {
    console.log(e);
  }
}

export function* callStudentFun() {
  yield takeEvery(studentSlice.actions.getStudents, callstudentGetFun);
  yield takeEvery(studentSlice.actions.updateStudent, callstudentUpdateFun);
  yield takeEvery(studentSlice.actions.deleteStudent, callstudentDeleteFun);
  yield takeEvery(studentSlice.actions.createStudent, callstudentAddFun);
}
