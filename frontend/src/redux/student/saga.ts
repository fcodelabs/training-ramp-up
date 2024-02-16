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
} from "./slice";

import { PayloadAction } from "@reduxjs/toolkit";
const BASE_URL = "http://localhost:5000/student";
//const BASE_URL = "https://ramp-up-backend-epcm.onrender.com/student";
//const BASE_URL = "https://backend.ramp-up-epcm.me/student";

function* getAllStudentsWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(
      axios.get<GridValidRowModel[]>,
      BASE_URL + "/allStudents"
    );
    console.log("data", data);
    yield put(updateStudent(data));
    yield put(fetchAllStudentsSuccess);
    //const response = yield call(axios.get, `${BASE_URL}/allStudents`);
    //yield put(fetchAllStudentsSuccess(response.data));
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
  console.log("newstudent", newStudent);
  try {
    console.log(newStudent);
    yield call(axios.post<GridValidRowModel>, BASE_URL + "/add", newStudent);
    yield put(fetchAllStudentsSuccess);
  } catch (error: any) {
    console.log("hello adding error");
    console.log(error);
    yield put(addStudentError());

    return error;
  }
}

function* updateStudentWorker(action: PayloadAction<GridValidRowModel>) {
  const updatedStudent = {
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobile: action.payload.mobile,
    dob: action.payload.dob,
    age: action.payload.age,
  };
  console.log("updatedStudent", updateStudent);
  try {
    yield call(
      axios.put<GridValidRowModel>,
      BASE_URL + `/edit/${action.payload.id}`,
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
    yield call(axios.delete<GridRowId>, BASE_URL + `/delete/${action.payload}`);
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
