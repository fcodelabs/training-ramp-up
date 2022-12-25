import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import {
  loginUserAction,
  saveUserAction,
} from './SignInSlice';
import { LoginDetails } from '../../utils/interfaces';
import { getUserService } from '../../services/userServices';

export function* SignInSaga() {
  yield takeEvery(loginUserAction, loginUser);
}
function* loginUser(action: AnyAction):any {
  console.log('second');
  try {
    const response: LoginDetails = yield call(getUserService, action.payload);
    if (response.data) {
      yield put(saveUserAction(true));
    } else {
      alert('can not find user,check email & password..!');
    }
  } catch (error) {
    console.log(error);
  }
}
