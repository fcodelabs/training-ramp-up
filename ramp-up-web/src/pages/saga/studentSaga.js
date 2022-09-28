import studentSlice from "../slice/studentSlice";
import { takeEvery, put, call } from "redux-saga/effects";
import {
  getItems,
  updateItem,
  deleteItem,
  insertItem,
} from "../../utils/services";

function* callstudentGetFun() {
  try {
    const res = yield call(getItems);

    yield put(studentSlice.actions.addStudent(res.data));
  } catch (e) {
    console.log(e);
  }
}
function* callstudentUpdateFun({ payload: payload }) {
  try {
    yield call(updateItem, payload);
  } catch (e) {
    console.log(e);
  }
}
function* callstudentDeleteFun({ payload: payload }) {
  console.log("Delete Student", payload);
  try {
    yield call(deleteItem, payload);
  } catch (e) {
    console.log(e);
  }
}
function* callstudentAddFun({ payload: payload }) {
  //console.log("STUDENTSAGAPAYLOAD", payload);
  try {
    yield call(insertItem, payload);
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
