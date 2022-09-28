import studentSlice from "../features/studentSlice";
import userSlice from "../features/userSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  insertStudent,
  updateStudent,
  deleteStudent,
  getStudents,
} from "../utils/services";
import { findUser, insertUser } from "../utils/userService";

function* watchGetStudent() {
  try {
    const response = yield call(getStudents);
    yield put(studentSlice.actions.saveStudents(response));
  } catch (error) {
    console.log(error);
  }
}
function* watchAddStudent({ payload: payload }) {
  try {
    yield call(insertStudent, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchUpdateStudent({ payload: payload }) {
  try {
    yield call(updateStudent, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchDeleteStudent({ payload: payload }) {
  try {
    yield call(deleteStudent, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchAddUser({ payload: payload }) {
  try {
    yield call(insertUser, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchLogUser({ payload: payload }) {
  try {
    const response = yield call(findUser, payload);
    //console.log("sagas Response", response.data.accessToken);
    yield put(userSlice.actions.saveUser(response.data));
  } catch (error) {
    alert(error);
  }
}

export function* postSagas() {
  yield takeEvery(studentSlice.actions.getStudents, watchGetStudent);
  yield takeEvery(studentSlice.actions.createStudent, watchAddStudent);
  yield takeEvery(studentSlice.actions.updateStudent, watchUpdateStudent);
  yield takeEvery(studentSlice.actions.deleteStudent, watchDeleteStudent);

  yield takeEvery(userSlice.actions.addUser, watchAddUser);
  yield takeEvery(userSlice.actions.logUser, watchLogUser);
  //yield takeEvery(userSlice.actions.saveUser, watchLogUser);
}

export default function* rootSaga() {
  yield all([...postSagas()]);
}
