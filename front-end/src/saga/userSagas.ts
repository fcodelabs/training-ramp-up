import { call, put, takeLatest } from "redux-saga/effects";

import { apiService } from "./apiService";
import {
  addUser,
  deleteUser,
  fetchUsers,
  fetchUsersSuccess,
  updateUser,
} from "../redux/userReducer";

function* addUserSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.addUser, action.payload);
  } catch (error) {
    console.error("addUserSaga", error);
  }
}

function* updateUserSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.updateUser, action.payload);
  } catch (error) {
    console.error("updateUserSaga", error);
  }
}

function* deleteUserSaga(action: any): Generator<any, void, any> {
  try {
    yield call(apiService.deleteUser, action.payload);
  } catch (error) {
    console.error("deleteUserSaga", error);
  }
}

function* getUserSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(apiService.getUsers);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error("getUserSaga", error);
  }
}

export function* UserSagas() {
  yield takeLatest(addUser, addUserSaga);
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(deleteUser, deleteUserSaga);
  yield takeLatest(fetchUsers, getUserSaga);
}

export {};
