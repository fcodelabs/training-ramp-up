import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import {
  loginUserAction,
  logOutUserAction,
  setUserDetails,
  registerUserAction,
  refreshFunction,
  saveUserAction,
} from '../slices/SignInSlice';

import { LoginDetails } from '../../../utils/interfaces';
import {
  getUserService,
  logoutUserService,
  getUserDetails,
  insertUserService,
} from '../../../services/userServices';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function* SignInSaga() {
  yield takeEvery(loginUserAction, loginUser);
  yield takeEvery(logOutUserAction, logOutUser);
  yield takeEvery(registerUserAction, registerUser);
  yield takeEvery(refreshFunction, refreshAction);
}

function* loginUser(action: AnyAction): any {
  try {
    const response: boolean = yield call(getUserService, action.payload);
    if (response) {
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
    alert('can not find user,check email & password..!');
    console.log(error);
  }
}

function* logOutUser(): any {
  try {
    const response: any = yield call(logoutUserService);
    if (response) {
      yield put(saveUserAction(false));
      yield put(setUserDetails([]));
    }
  } catch (error) {
    console.log(error);
  }
}

function* registerUser(action: AnyAction): any {
  try {
    const response: boolean = yield call(
      insertUserService,
      action.payload
    );
    if (response) {
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
      // yield put(signUpSuccess(true));
      alert('User Added Successfully!');
    } else {
      alert('User Already Exists!');
    }
  } catch (error) {
    console.log(error);
  }
}

function* refreshAction(): any {
  // yield put(saveUserAction(true));
}
