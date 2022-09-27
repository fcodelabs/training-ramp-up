import studentSlice from "../slice/studentSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  getItems,
  updateItem,
  deleteItem,
  insertItem,
} from "../../utils/services";

function* studentGetFun() {
  try {
    const res = yield call(getItems);
    console.log("ResStudent", res);
    yield put(studentSlice.actions.saveStudent(res));
  } catch (e) {
    console.log(e);
  }
}
function* studentUpdateFun({ payload: payload }) {
  try {
    yield call(updateItem, payload);
  } catch (e) {
    console.log(e);
  }
}
function* studentDeleteFun({ payload: payload }) {
  try {
    yield call(deleteItem, payload);
  } catch (e) {
    console.log(e);
  }
}
function* studentAddFun({ payload: payload }) {
  try {
    yield call(insertItem, payload);
  } catch (e) {
    console.log(e);
  }
}

export function* callStudentFun() {
  yield takeEvery(studentSlice.actions.getStudents, studentGetFun);
  yield takeEvery(studentSlice.actions.updateStudent, studentUpdateFun);
  yield takeEvery(studentSlice.action.deleteStudent, studentDeleteFun);
  yield takeEvery(studentSlice.actions.saveStudent, studentAddFun);
}
