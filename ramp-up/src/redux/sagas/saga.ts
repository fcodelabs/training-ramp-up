import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import axios from "axios";
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
} from "../slices/slice";

import { PayloadAction } from "@reduxjs/toolkit";


function* getAllStudentsWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(
      axios.get<GridValidRowModel[]>,
      "http://localhost:4000/api/students"
    );
    console.log("data", data);
    yield put(updateStudent(data));
    yield put(fetchAllStudentsSuccess);
    
  } catch (error: any) {
    yield put(fetchStudentsError(error));
  }
}

function* addNewStudentWorker(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  console.log("adding", action.payload);

  const newStudent = {
    id: action.payload.id,
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobile: action.payload.mobile,
    dob: action.payload.dob,
    age: action.payload.age,
  };
  
  try {
    console.log(newStudent);
    yield call(
      axios.post<GridValidRowModel>,
      "http://localhost:4000/api/students",
      newStudent
    );
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    
    yield put(addStudentError());

    return error;
  }
}

function* updateStudentWorker(action: PayloadAction<GridValidRowModel>) {
  const updatedStudent = {
    id: action.payload.id,
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobile: action.payload.mobile,
    dob: action.payload.dob,
    age: action.payload.age,
  };

  try {
    yield call(
      axios.put<GridValidRowModel>,
      `http://localhost:4000/api/students/${action.payload.id}`,
      updatedStudent
    );
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    yield put(editStudentError(error));

    return error;
  }
}

function* deleteStudentWorker(action: PayloadAction<GridRowId>) {
  try {
    yield call(
      axios.delete<GridRowId>,
      `http://localhost:4000/api/students/${action.payload}`
    );
  } catch (error: any) {
    yield put(removeStudentError(error));

    return error;
  }
}

function* getAllStudentsWatcher() {
  yield takeLatest(fetchAllStudentsSuccess, getAllStudentsWorker);
}

function* addNewStudentWatcher() {
  yield takeLeading(addStudentSuccess.type, addNewStudentWorker);
}

function* updateStudentWatcher() {
  yield takeLeading(editStudentSuccess.type, updateStudentWorker);
}

function* deleteStudentWatcher() {
  yield takeLeading(removeStudentSuccess, deleteStudentWorker);
}

export function* studentSaga() {
  yield all([
    getAllStudentsWatcher(),
    addNewStudentWatcher(),
    updateStudentWatcher(),
    deleteStudentWatcher(),
  ]);
}