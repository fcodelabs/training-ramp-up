import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";
import {
  addStudent,
  addStudentError,
  fetchAllStudents,
  fetchStudentsError,
  updateStudent,
} from "../slice/studentSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* watchGetAllStudents(): Generator<any, any, any> {
  try {
    const { data } = yield call(
      axios.get<GridValidRowModel[]>,
      "http://localhost:5000/students/getAllStudents"
    );
    yield put(updateStudent(data));
  } catch (error: any) {
    yield put(fetchStudentsError(error));
    console.log(error);
  }
}

function* watchAddNewStudent(
  action: PayloadAction<GridValidRowModel>
): Generator<any, any, any> {
  console.log("done.....");
  console.log(action.payload);
  const newStudent = {
    id: action.payload.id,
    name: action.payload.name,
    gender: action.payload.gender,
    address: action.payload.address,
    mobileno: action.payload.mobileno,
    dateofbirth: action.payload.dateofbirth,
    age: action.payload.age,
  };
  console.log(newStudent);
  try {
    const { data } = yield call(
      axios.post<GridValidRowModel[]>,
      "http://localhost:5000/students/newStudent",
      newStudent
    );
  } catch (error: any) {
    yield put(addStudentError());
    return error;
  }
}

// function* watchDeleteUser(action: any) {
//   try {
//     yield call(deleteUserAsync, action.payload);
//   } catch (error: any) {
//     return error;
//   }
// }

export function* userSaga(): Generator<any, any, any> {
  yield takeLatest(fetchAllStudents, watchGetAllStudents);
  yield takeLatest(addStudent.type, watchAddNewStudent);
  //   yield takeLeading(discardUser, watchDeleteUser);
}
