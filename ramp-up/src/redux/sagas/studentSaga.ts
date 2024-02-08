import { all,takeLatest, takeLeading, put, call } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
  updateStudent,
  fetchAllStudentsSuccess,
  fetchStudentsError,
  addStudentSuccess,
  addStudentError,
  removeStudentSuccess,
  removeStudentError,
  editStudentSuccess,
  editStudentError,
} from "../slices/studentSlice";


export function* studentSaga() {
  yield all([
    takeLatest(fetchAllStudentsSuccess, getAllStudentsWorker),
    takeLeading(addStudentSuccess.type, addNewStudentWorker),
    takeLeading(editStudentSuccess.type, updateStudentWorker),
    takeLeading(removeStudentSuccess, deleteStudentWorker),
  ]);
}

function* getAllStudentsWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(axios.get, "http://localhost:4000/api/students");
    yield put(updateStudent(data));
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    yield put(fetchStudentsError(error));
  }
}

function* addNewStudentWorker(action: PayloadAction<GridValidRowModel>) {
  const newStudent = { ...action.payload };
  try {
    yield call(axios.post, "http://localhost:4000/api/students", newStudent);
    yield put(addStudentSuccess(action.payload));
    yield put(fetchAllStudentsSuccess());
  } catch (error: any) {
    yield put(addStudentError(error));
  }
}

function* updateStudentWorker(action: PayloadAction<GridValidRowModel>) {
  const updatedStudent = { ...action.payload };
  try {
    yield call(
      axios.put,
      `http://localhost:4000/api/students/${action.payload.id}`,
      updatedStudent
    );
    yield put(editStudentSuccess);
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    yield put(editStudentError(error));
  }
}

function* deleteStudentWorker(action: PayloadAction<GridRowId>) {
  try {
    yield call(axios.delete, `http://localhost:4000/api/students/${action.payload}`);
    yield put(removeStudentSuccess);
  } catch (error: any) {
    yield put(removeStudentError(error));
  }
}
