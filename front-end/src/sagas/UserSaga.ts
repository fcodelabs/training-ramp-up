import { call, put, takeEvery } from 'redux-saga/effects'
import { setUser, getUser, addUser, setError } from '../slices/UserSlice'
import { getAUser, insertUser } from '../services/UserOperations'
import { AnyAction } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../utils/interface'

function * findUser (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(getAUser, action.payload)
    if (response.data !== null) {
      yield put(setUser(response))
    }
  } catch (err) {
    console.error('error:', err)
    yield put(setError(err))
  }
}

function * saveUser (action: AnyAction) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: ResponseGenerator = yield call(insertUser, action.payload)
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

export function * UserSaga () {
  yield takeEvery(getUser.type, findUser)
  yield takeEvery(addUser.type, saveUser)
}
