import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";
import {
  fetchAllStudents,
  fetchStudentsError,
  updateStudent,
} from "../slice/studentSlice";

function* watchGetAllStudents() {
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

// function* watchAddNewUser(action: any) {
//   try {
//     const student: GridValidRowModel = yield call(
//       addUsersAsync,
//       action.payload
//     );
//     yield put(addUser(student));
//   } catch (error: any) {
//     yield put(setUserError(action.payload.id));
//     return error;
//   }
// }

// function* watchDeleteUser(action: any) {
//   try {
//     yield call(deleteUserAsync, action.payload);
//   } catch (error: any) {
//     return error;
//   }
// }

export function* userSaga() {
  yield takeLatest(fetchAllStudents, watchGetAllStudents);
  //   yield takeLatest(addUser, watchAddNewUser);
  //   yield takeLeading(discardUser, watchDeleteUser);
}
