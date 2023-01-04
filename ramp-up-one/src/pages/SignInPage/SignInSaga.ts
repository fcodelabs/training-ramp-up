import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import {
  loginUserAction,
  saveUserAction,
  logOutUserAction,
} from './SignInSlice';

import Cookies from 'universal-cookie';
import { LoginDetails } from '../../utils/interfaces';
import { getUserService, logoutUserService } from '../../services/userServices';
const cookies = new Cookies();

export function* SignInSaga() {
  yield takeEvery(loginUserAction, loginUser);
  yield takeEvery(logOutUserAction, logOutUser);
}
function* loginUser(action: AnyAction):any {
  console.log('second');
  try {
    const response: LoginDetails = yield call(getUserService, action.payload);
    console.log(response);
    if (response.data) {
      const userData = cookies.get('refreshToken');
      console.log(userData);
      yield put(saveUserAction(true));
      
    } else {
      alert('can not find user,check email & password..!');
    }
  } catch (error) {
    console.log(error);
  }
}


function* logOutUser(): any {
  console.log('second');
  try {
    const response: any = yield call(logoutUserService);
    console.log(response);
    if (response) {
      yield put(saveUserAction(false));
    } else {
      alert('Your Session is Expired');
      yield put(saveUserAction(false));
    }
    
  } catch (error) {
    console.log(error);
  }
}
