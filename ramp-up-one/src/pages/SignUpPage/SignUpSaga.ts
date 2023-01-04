import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import { registerUserAction, saveUserAction } from './SignUpSlice';
import { LoginDetails } from '../../utils/interfaces';
import { getUserService, insertUserService } from '../../services/userServices';

export function* SignUpSaga() {
  yield takeEvery(registerUserAction, registerUser);
}

function* registerUser(action: AnyAction) {
  try {
    const isAvaialble: LoginDetails = yield call(
      getUserService,
      action.payload
    );
    if (isAvaialble.data) {
      alert('User Already Exists');
    } else {
      const response: LoginDetails = yield call(
        insertUserService,
        action.payload
      );
      if (response) { 
        yield put(saveUserAction(true));
      } else {
        alert('Registration Failed!');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
