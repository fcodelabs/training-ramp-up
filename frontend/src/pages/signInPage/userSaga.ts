import { ForkEffect, takeEvery, put } from 'redux-saga/effects'
import {
  authloginService,
  loginService,
  logoutService,
  resisterService,
} from '../../services/authServices'
import { clearPersonData } from '../rampUpHome/personDataSlice'
import {
  authLoginStart,
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
  userLogOutFailure,
  userLogOutStart,
  userLogOutSuccess,
  userRegisterFailure,
  userRegisterStart,
  userRegisterSuccess,
} from './userSlice'

function* userRegisterSaga(action: any): IterableIterator<any> {
  try {
    const message: any = yield resisterService(action.payload)
    yield put(userRegisterSuccess(message))
  } catch (e: any) {
    yield put(userRegisterFailure(e.response.data.message))
  }
}
function* userLoginSaga(action: any): IterableIterator<any> {
  try {
    const message: any = yield loginService(action.payload)
    if (message.user) {
      yield put(userLoginSuccess(message))
    }
  } catch (e: any) {
    // console.log(e.response.data.message)
    yield put(userLoginFailure(e.response.data.message))
  }
}
function* authLoginSaga(action: any): IterableIterator<any> {
  try {
    const message: any = yield authloginService()
    console.log(message)
    yield put(userLoginSuccess(message.user))
  } catch (e: any) {
    // console.log(e.response.data.message)
    yield put(userLoginFailure(e.response.data.message))
  }
}
function* userLogOutSaga(action: any): IterableIterator<any> {
  try {
    yield logoutService(action.payload)
    console.log('logoutsaga')
    yield put(userLogOutSuccess())
    yield put(clearPersonData())
  } catch (e) {
    yield put(userLogOutFailure())
  }
}
export function* userLogin(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userLoginStart, userLoginSaga)
}
export function* authLogin(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(authLoginStart, authLoginSaga)
}
export function* userRegister(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userRegisterStart, userRegisterSaga)
}
export function* userLogOut(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userLogOutStart, userLogOutSaga)
}
