import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import {
  loginUserAction,
  saveUserAction,
  logOutUserAction,
  setUserDetails,
  registerUserAction,
} from './SignInSlice';

import Cookies from 'universal-cookie';
import { LoginDetails } from '../../utils/interfaces';
import {
  getUserService,
  logoutUserService,
  getUserDetails,
  insertUserService,
} from '../../services/userServices';
const cookies = new Cookies();

export function* SignInSaga() {
  yield takeEvery(loginUserAction, loginUser);
  yield takeEvery(logOutUserAction, logOutUser);
  yield takeEvery(registerUserAction, registerUser);
}
function* loginUser(action: AnyAction): any {
  try {
    const response: LoginDetails = yield call(getUserService, action.payload);
    if (response.data) {
      const userData: LoginDetails = yield call(getUserDetails);
      console.log(userData);

      const userDataCookie = cookies.get('userData');
      yield put(saveUserAction(true));
      yield put(
        setUserDetails({
          userRoll: userDataCookie.userRoll,
          name: userDataCookie.name,
        })
      );
    } else {
      alert('can not find user,check email & password..!');
    }
  } catch (error) {
    console.log(error);
  }
}

function* logOutUser(): any {
  try {
    const response: any = yield call(logoutUserService);
    if (response.status === 200) {
      yield put(saveUserAction(false));
      yield put(setUserDetails([]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* registerUser(action: AnyAction): any {
  try {
    const response: LoginDetails = yield call(
      insertUserService,
      action.payload
    );
    if (response.data) {
      const userData: LoginDetails = yield call(getUserDetails);
      console.log(userData);

      const userDataCookie = cookies.get('userData');
      yield put(saveUserAction(true));
      yield put(
        setUserDetails({
          userRoll: userDataCookie.userRoll,
          name: userDataCookie.name,
        })
      );
    } else {
      alert('User Already Exists!');
    }
  } catch (error) {
    console.log(error);
  }
}
