import {  ForkEffect, takeEvery, put } from 'redux-saga/effects'
import { loginService, resisterService } from '../../services/authServices'
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
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

export function* userLogin(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userLoginStart, userLoginSaga)
}
export function* userRegister(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(userRegisterStart, userRegisterSaga)
}

