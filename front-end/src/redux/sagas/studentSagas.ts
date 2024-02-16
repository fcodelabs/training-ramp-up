import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addStudent,
  editStudent,
  removeStudent,
  replaceStudents,
  fetchStudents,
} from "../studentsSlice/stdentsSlice";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchStudentsSaga(): Generator<any, any, any> {
  try {
    const { data: students } = yield call(
      axios.get<GridValidRowModel[]>,
      `${process.env.REACT_APP_API_URL}/students/`
    );

    yield put(replaceStudents(students));
  } catch (error) {
    console.log(error);
  }
}

function* addStudentSaga(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  try {
    const { data: student } = yield call(
      axios.post<GridValidRowModel>,
      `${process.env.REACT_APP_API_URL}/students/`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* editStudentSaga(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  try {
    const { data: student } = yield call(
      axios.put<GridValidRowModel>,
      `${process.env.REACT_APP_API_URL}/students/`,
      action.payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* removeStudentSaga(
  action: PayloadAction<GridRowId>
): Generator<any, any, any> {
  try {
    const { data: student } = yield call(
      axios.delete,
      `${process.env.REACT_APP_API_URL}/students/${action.payload}`
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* watchStudentSage(): Generator<any, any, any> {
  yield takeLatest(fetchStudents.type, fetchStudentsSaga);
  yield takeLatest(addStudent.type, addStudentSaga);
  yield takeLatest(editStudent.type, editStudentSaga);
  yield takeLatest(removeStudent.type, removeStudentSaga);
}
