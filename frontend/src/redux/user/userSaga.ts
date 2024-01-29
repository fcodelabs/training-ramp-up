import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { setUsers, fetchUsers, fetchUsersFailure, addUser,setUserError, discardUser } from "./userSlice";
import { GridValidRowModel } from "@mui/x-data-grid";
import { fetchUsersAsync, addUsersAsync, deleteUserAsync } from "../../utilities/userServices";

function* watchFetchStudents() {
  try {
    const students: GridValidRowModel[] = yield call(fetchUsersAsync);
    yield put(setUsers(students));
  } catch (error: any) {
    yield put(fetchUsersFailure(error));
     
  }
}

function* watchAddNewUser(action: any) {
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

function* watchDeleteUser(action: any) {
  try {
    yield call(deleteUserAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}


export function* userSaga() {
  yield takeLatest(fetchUsers, watchFetchStudents);
  yield takeLatest(addUser, watchAddNewUser);
  yield takeLeading(discardUser, watchDeleteUser);
}

