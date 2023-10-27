import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { studentActions } from "./slice";
import { createStudent, loadAllStudents, removeStudent, updateStudent } from "../../api/studentApi";
import { toast } from "react-toastify";

interface IStudentData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
}

function* saveAndUpdateStudent(action: PayloadAction<IStudentData>) {
  const isUpdate: boolean = action.payload.id != -1;
  try {
    if (isUpdate) {
      yield updateStudent(action.payload.id, action.payload);
    } else {
      yield createStudent(action.payload);
    }
    yield put(studentActions.fetchStudent());
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* getAllStudents() {
  try {
    const response: IStudentData[] = yield loadAllStudents();
    yield put(studentActions.setStudent(response));
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* deleteStudent(action: PayloadAction<number>) {
  try {
    if (action.payload != -1) {
      yield removeStudent(action.payload);
      yield put(studentActions.fetchStudent());
    }
  } catch (error) {
    toast("Something went wrong..!");
  }
}

export function* studentSaga() {
  yield takeEvery(studentActions.fetchStudent.type, getAllStudents);
  yield takeEvery(studentActions.updateStudent, saveAndUpdateStudent);
  yield takeEvery(studentActions.removeStudent, deleteStudent);
}
