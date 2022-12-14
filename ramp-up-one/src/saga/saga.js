import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
  deleteStudentAction,
  addStudent,
} from '../slice/studentSlice';
import {
  insertStudentService,
  getStudentService,
  updateStudentService,
  deleteStudentService,
} from '../services/services';

export default function* studentSaga() {
  yield takeEvery(getStudentAction, getStudent);
  yield takeEvery(addStudent, saveStudent);
  yield takeEvery(updateStudentAction, updateStudent);
  yield takeEvery(deleteStudentAction, deleteStudent);
}
export function* getStudent() {
  try {
    const response = yield call(getStudentService);
    yield put(saveStudentAction(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* saveStudent({ payload }) {
  try {
    const response = yield call(insertStudentService, payload);
    if (response.status===200) {
      //  socket.emit('student_add', 'Student Added');
      alert(response.data.message);
      yield put(getStudentAction());
    }else{
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateStudent({ payload }) {
  try {
    const response = yield call(updateStudentService, payload);
    if (response.status===200) {
      //  socket.emit('student_update', 'Student updated');
      alert(response.data.message);
      yield put(getStudentAction());
    }else{
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudent({ payload }) {
  try {
    const response = yield call(deleteStudentService, payload);
    if (response.status===200) {
      // socket.emit('student_delete', 'Student Deleted');
      alert(response.data.message);
      yield put(getStudentAction());
    }else{
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
