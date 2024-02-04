import { put, call, takeLeading } from "redux-saga/effects";
import {
  setStudents,
  fetchStudents,
  fetchStudentsFailure,
  addStudent,
  setStudentError,
  discardStudent,
} from "./slice";
import { GridValidRowModel } from "@mui/x-data-grid";
import {
  fetchStudentsAsync,
  addStudentsAsync,
  deleteStudentAsync,
  updateStudentAsync,
} from "../../utilities/services";

export function* watchFetchStudents() {
  try {
    const students: GridValidRowModel[] = yield call(fetchStudentsAsync);
    yield put(setStudents(students));
  } catch (error: any) {
    yield put(fetchStudentsFailure(error));
  }
}

export function* watchAddNewStudent(action: any) {
  try {
    let student: GridValidRowModel;
    const data ={
      row : action.payload.editedRow,
      socketId : action.payload.socketId
    }
    if (data.row.isNew) {
      student = yield call(addStudentsAsync, action.payload);
    } else {
      student = yield call(updateStudentAsync, action.payload);
    }
    yield put(addStudent(student));
  } catch (error: any) {
    yield put(setStudentError(action.payload.editedRow.id));
    return error;
  }
}

export function* watchDeleteStudent(action: any) {
  try {
    yield call(deleteStudentAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}

export function* studentSaga() {
  yield takeLeading(fetchStudents, watchFetchStudents);
  yield takeLeading(addStudent, watchAddNewStudent);
  yield takeLeading(discardStudent, watchDeleteStudent);
}
