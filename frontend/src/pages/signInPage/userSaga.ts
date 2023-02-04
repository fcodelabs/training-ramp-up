import { ForkEffect, takeEvery, put } from 'redux-saga/effects'
import { loginService, logoutService, resisterService } from '../../services/authServices'
import {
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
  } catch (e) {
    yield put(userRegisterFailure())
  }
}
function* userLoginSaga(action: any): IterableIterator<any> {
  try {
    const message: any = yield loginService(action.payload)
    yield put(userLoginSuccess(message))
  } catch (e) {
    yield put(userLoginFailure())
  }
}

function* userLogOutSaga(action: any): IterableIterator<any> {
  try {
    yield logoutService(action.payload)
    yield put(userLogOutSuccess())
  } catch (e) {
    yield put(userLogOutFailure())
  }
}
export function* userLogin(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userLoginStart, userLoginSaga)
}
export function* userRegister(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userRegisterStart, userRegisterSaga)
}
export function* userLogOut(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userLogOutStart, userLogOutSaga)
}
