import studentSlice from "../slice/studentSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  getItems,
  updateItem,
  deleteItem,
  insertItem,
} from "../../utils/services";

function* studentGetFun() {
  //console.log("studentgenFun");
  try {
    const res = yield call(getItems);
    //console.log("ResStudent", res);
    yield put(studentSlice.actions.addStudent(res.data));
  } catch (e) {
    console.log(e);
  }
}
function* studentUpdateFun({ payload: payload }) {
  //console.log("UpdateStudent");
  try {
    yield call(updateItem, payload);
    //yield put(studentSlice.actions.addStudent())
  } catch (e) {
    console.log(e);
  }
}
function* studentDeleteFun({ payload: payload }) {
  console.log("Delete Student", payload);
  try {
    yield call(deleteItem, payload);
  } catch (e) {
    console.log(e);
  }
}
function* studentAddFun({ payload: payload }) {
  //console.log("STUDENTSAGAPAYLOAD", payload);
  try {
    yield call(insertItem, payload);
  } catch (e) {
    console.log(e);
  }
}

export function* callStudentFun() {
  yield takeEvery(studentSlice.actions.getStudents, studentGetFun);
  yield takeEvery(studentSlice.actions.updateStudent, studentUpdateFun);
  yield takeEvery(studentSlice.actions.deleteStudent, studentDeleteFun);
  yield takeEvery(studentSlice.actions.createStudent, studentAddFun);
}
