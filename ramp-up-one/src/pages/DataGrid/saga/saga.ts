import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import {
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
  deleteStudentAction,
  addStudent,
} from '../slices/studentSlice';
import {
  insertStudentService,
  getStudentService,
  updateStudentService,
  deleteStudentService,
} from '../../../services/StudentServices';
// import { newAccessTokenService } from '../../services/userServices';
import { StudentModel } from '../../../utils/interfaces';
import {
  setUserDetails,
  saveUserAction,
} from '../../SignInPage/slices/SignInSlice';

const cookies = new Cookies();

export default function* studentSaga() {
  yield takeEvery(getStudentAction, getStudent);
  yield takeEvery(addStudent, saveStudent);
  yield takeEvery(updateStudentAction, updateStudent);
  yield takeEvery(deleteStudentAction, deleteStudent);
}
export function* getStudent(): any {
  try {
    const response: StudentModel = yield call(getStudentService);
    const userDataCookie = cookies.get('userData');
    yield put(saveStudentAction(response.data));
    yield put(
      setUserDetails({
        userRoll: userDataCookie.userRoll,
        name: userDataCookie.name,
      })
    );
    yield put(saveUserAction(true));
  } catch (error) {
    console.log(error);
  }
}

function* saveStudent(action: AnyAction): any {
  try {
    const response: StudentModel = yield call(
      insertStudentService,
      action.payload
    );
    if (response) {
      yield put(getStudentAction());
      alert('Student added successfully..!');
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateStudent(action: AnyAction) {
  try {
    const response: StudentModel = yield call(
      updateStudentService,
      action.payload
    );
    if (response) {
      yield put(getStudentAction());
      alert('Student updated successfully..!');
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudent(action: AnyAction) {
  try {
    const response: StudentModel = yield call(
      deleteStudentService,
      action.payload
    );
    if (response) {
      yield put(getStudentAction());
      alert('Student deleted successfully..!');
    }
  } catch (error) {
    console.log(error);
  }
}
