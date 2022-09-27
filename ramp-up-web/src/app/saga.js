import studentSlice from "../features/studentSlice";
import userSlice from "../features/userSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  insertStudent,
  updateStudent,
  deleteStudent,
  getStudents,
} from "../utils/services";
import { findUser } from "../utils/userService";

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
function* watchGetUser({ payload: payload }) {
  const response = yield call(findUser, payload);
  yield put(userSlice.actions.saveUser(response));
}

export function* postSagas() {
  yield takeEvery(studentSlice.actions.getStudents, watchGetStudent);
  yield takeEvery(studentSlice.actions.createStudent, watchAddStudent);
  yield takeEvery(studentSlice.actions.updateStudent, watchUpdateStudent);
  yield takeEvery(studentSlice.actions.deleteStudent, watchDeleteStudent);

  yield takeEvery(userSlice.actions.getUsers, watchGetUser);
}

export default function* rootSaga() {
  yield all([...postSagas()]);
}
