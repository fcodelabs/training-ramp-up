import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import {
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
  deleteStudentAction,
  addStudent,
} from './studentSlice';
import {
  insertStudentService,
  getStudentService,
  updateStudentService,
  deleteStudentService,
} from '../../services/StudentServices';
import { newAccessTokenService } from '../../services/userServices';
import { StudentModel } from '../../utils/interfaces';

export default function* studentSaga() {
  yield takeEvery(getStudentAction, getStudent);
  yield takeEvery(addStudent, saveStudent);
  yield takeEvery(updateStudentAction, updateStudent);
  yield takeEvery(deleteStudentAction, deleteStudent);
}
export function* getStudent():any {
  try {
    const response: StudentModel = yield call(getStudentService);
    yield put(saveStudentAction(response.data));
  } catch (error) {

    try {
      const authorized: any = yield call(newAccessTokenService);
      if (authorized) {
        const response: StudentModel = yield call(getStudentService);
        yield put(saveStudentAction(response.data));
      } else {
        alert('Unauthorized');
      }
    } catch (err) {
      console.log(err);
    }


  }
}

function* saveStudent(action: AnyAction):any {
  try {


    const response: StudentModel = yield call(
      insertStudentService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getStudentAction());
    } else {
      alert(response.data.message);
    }


  } catch (error) {


    try {
      const authorized:any = yield call(newAccessTokenService);
      console.log('authorized', authorized);
      if (authorized) {
        const response: StudentModel = yield call(
          insertStudentService,
          action.payload
        );
        if (response.status === 200) {
          yield put(getStudentAction());
        } else {
          alert(response.data.message);
        }
      } else {
        alert('Unauthorized');
      }


    } catch (err) {
      console.log(err);
    }


  }
}

function* updateStudent(action: AnyAction) {
  try {
    console.log(action.payload);
    const response: StudentModel = yield call(
      updateStudentService,
      action.payload
    );
    if (response.status === 200) {
      yield put(getStudentAction());
    } else {
      alert(response.data.message);
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
    if (response.status === 200) {
      yield put(getStudentAction());
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
