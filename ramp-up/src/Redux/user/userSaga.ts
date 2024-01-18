import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { setUsers, fetchUsers, fetchUsersFailure, addUser,setUserError, discardUser } from "./userSlice";
import { GridValidRowModel } from "@mui/x-data-grid";
import { fetchUsersAsync, addUsersAsync, deleteUserAsync } from "../../services/userServices";

function* fetchStudents() {
  try {
    const students: GridValidRowModel[] = yield call(fetchUsersAsync);
    yield put(setUsers(students));
  } catch (error: any) {
    yield put(fetchUsersFailure(error));
  }
}

function* addNewUser(action: any) {
  try {
    const student: GridValidRowModel = yield call(
      addUsersAsync,
      action.payload
    );
    yield put(addUser(student));
  } catch (error: any) {
    yield put(setUserError(action.payload.id));
    return error;
  }
}

function* deleteUser(action: any) {
  try {
    yield call(deleteUserAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}


export function* userSaga() {
  yield takeLatest(fetchUsers, fetchStudents);
  yield takeLeading(addUser, addNewUser);
  yield takeLeading(discardUser, deleteUser);
}

