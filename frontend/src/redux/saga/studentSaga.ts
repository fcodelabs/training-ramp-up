import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";
import {
  addStudent,
  addStudentError,
  editStudent,
  fetchAllStudents,
  fetchStudentsError,
  removeStudent,
  removeStudentError,
  updateStudent,
  updateStudentError,
} from "../slice/studentSlice";
import { PayloadAction } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_STUDENTS as string;

function* watchGetAllStudents(): Generator<any, any, any> {
  try {
    const { data } = yield call(
      axios.get<GridValidRowModel[]>,
      `${apiUrl}/getAllStudents`
    );
    yield put(updateStudent(data));
  } catch (error: any) {
    yield put(fetchStudentsError(error));
    yield put(fetchAllStudents());
    console.log(error);
  }
}

function* watchAddNewStudent(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  const newStudent = {
    id: action.payload.id,
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobileno: action.payload.mobileno,
    dateofbirth: action.payload.dateofbirth,
    age: action.payload.age,
  };
  try {
    yield call(
      axios.post<GridValidRowModel>,
      `${apiUrl}/newStudent`,
      newStudent
    );
  } catch (error: any) {
    yield put(addStudentError());
    yield put(fetchAllStudents());
    return error;
  }
}

function* watchUpdateStudent(action: PayloadAction<GridValidRowModel>) {
  const updatedStudent = {
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobileno: action.payload.mobileno,
    dateofbirth: action.payload.dateofbirth,
    age: action.payload.age,
  };
  try {
    yield call(
      axios.put<GridValidRowModel>,
      `${apiUrl}/updateStudent/${action.payload.id}`,
      updatedStudent
    );
  } catch (error: any) {
    yield put(updateStudentError(error));
    yield put(fetchAllStudents());
    return error;
  }
}

function* watchRemoveStudent(action: PayloadAction<GridRowId>) {
  try {
    yield call(axios.delete, `${apiUrl}/removeStudent/${action.payload}`);
  } catch (error: any) {
    yield put(removeStudentError(error));
    yield put(fetchAllStudents());
    return error;
  }
}

export function* userSaga(): Generator<any, any, any> {
  yield takeLatest(fetchAllStudents, watchGetAllStudents);
  yield takeLatest(addStudent.type, watchAddNewStudent);
  yield takeLeading(editStudent.type, watchUpdateStudent);
  yield takeLeading(removeStudent, watchRemoveStudent);
}
