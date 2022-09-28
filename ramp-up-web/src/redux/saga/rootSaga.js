import studentSlice from "../slice/studentSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  insertItem,
  updateItem,
  deleteItem,
  getItems,
} from "../../services/studentServices.js";

function* watchRetrieveStudent() {
  try {
    const response = yield call(getItems);
    yield put(studentSlice.actions.saveStudents(response));
  } catch (error) {
    console.log(error);
  }
}
function* watchInsertStudent({ payload: payload }) {
  try {
    yield call(insertItem, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchPutItem({ payload: payload }) {
  try {
    yield call(updateItem, payload);
  } catch (error) {
    console.log(error);
  }
}
function* watchRemoveStudent({ payload: payload }) {
  try {
    yield call(deleteItem, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* postSagas() {
  yield takeEvery(studentSlice.actions.retrieveStudents, watchRetrieveStudent);
  yield takeEvery(studentSlice.actions.insertStudent, watchInsertStudent);
  yield takeEvery(studentSlice.actions.putStudent, watchPutItem);
  yield takeEvery(studentSlice.actions.removeStudent, watchRemoveStudent);
}

export default function* rootSaga() {
  yield all([...postSagas()]);
}
