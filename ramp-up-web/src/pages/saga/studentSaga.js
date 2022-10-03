import studentSlice from "../slice/studentSlice";
import { takeEvery, put, call } from "redux-saga/effects";
import {
  getItems,
  updateItem,
  deleteItem,
  insertItem,
} from "../../utils/studentServices";

function* callstudentGetFun() {
  try {
    const res = yield call(getItems);
    console.log("AllStudent", res);
    yield put(studentSlice.actions.addStudent(res.user));
  } catch (e) {
    console.log(e);
  }
}
function* callstudentUpdateFun({ payload: payload }) {
  console.log("UpdatePayload", payload);
  try {
    yield call(updateItem, payload);
    yield put(studentSlice.actions.getStudents());
  } catch (e) {
    console.log(e);
  }
}
function* callstudentDeleteFun({ payload: payload }) {
  try {
    yield call(deleteItem, payload);
    yield put(studentSlice.actions.getStudents());
  } catch (e) {
    console.log(e);
  }
}
function* callstudentAddFun({ payload: payload }) {
  try {
    yield call(insertItem, payload);
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
