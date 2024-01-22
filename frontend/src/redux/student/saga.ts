import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import axios from "axios";
import {
  setLoading,
  getAllStudentsSuccess,
  getAllStudentsFailure,
  addStudentSuccess,
  addStudentFailure,
  editStudentSuccess,
  editStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from "./slice";
import { act } from "react-dom/test-utils";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { PayloadAction } from "@reduxjs/toolkit";

interface IStudent {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mobile: string;
  dob: Date;
  isNew?: boolean;
}

const BASE_URL = "http://localhost:5000/student";

function* getAllStudentsWorker(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const response = yield call(axios.get, `${BASE_URL}/allStudents`);
    yield put(getAllStudentsSuccess(response.data));
  } catch (error) {
    yield put(getAllStudentsFailure(error as string));
  }
}

function* addStudentWorker(
  action: PayloadAction<GridValidRowModel>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const newStudent = {
      id: action.payload.id,
      name: action.payload.name,
      gender: action.payload.gender,
      address: action.payload.address,
      mobile: action.payload.mobile,
      dob: action.payload.dob,
      age: action.payload.age,
    };
    yield call(axios.post, `${BASE_URL}/add`, newStudent);
    yield put(addStudentSuccess());
  } catch (error) {
    yield put(addStudentFailure(error as string));
  }
}

function* editStudentWorker(
  action: PayloadAction<GridValidRowModel>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const editedStudent = {
      id: action.payload.id,
      name: action.payload.name,
      gender: action.payload.gender,
      address: action.payload.address,
      mobile: action.payload.mobile,
      dob: action.payload.dob,
      age: action.payload.age,
    };
    yield call(
      axios.put,
      `${BASE_URL}/edit/${editedStudent.id}`,
      editedStudent
    );
    yield put(editStudentSuccess());
  } catch (error) {
    yield put(editStudentFailure(error as string));
  }
}

function* deleteStudentWorker(
  action: PayloadAction<GridRowId>
): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    yield call(axios.delete, `${BASE_URL}/delete/${action.payload}`);
    yield put(deleteStudentSuccess());
  } catch (error) {
    yield put(deleteStudentFailure(error as string));
  }
}

function* getAllStudentsWatcher() {
  yield takeLatest("student/getAllStudents", getAllStudentsWorker);
}

function* addStudentWatcher() {
  yield takeLatest("student/addStudent", addStudentWorker);
}

function* editStudentWatcher() {
  yield takeLeading("student/editStudent", editStudentWorker);
}

function* deleteStudentWatcher() {
  yield takeLeading("student/deleteStudent", deleteStudentWorker);
}

export function* studentSaga() {
  yield all([
    getAllStudentsWatcher(),
    addStudentWatcher(),
    editStudentWatcher(),
    deleteStudentWatcher(),
  ]);
}
