import { call, put, takeEvery } from 'redux-saga/effects'
import {
  setUser,
  getUser,
  addUser,
  setError,
  setAddStatus,
  refreshUser,
  unSetUser,
  setAccessToken
} from '../slices/UserSlice'
import { getAUser, insertUser, refreshUserToken } from '../services/UserOperations'
import { AnyAction } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../utils/interface'

function * findUser (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(getAUser, action.payload)
    if (response.status === 200) {
      yield put(setUser(response))
    } else {
      alert(response)
    }
  } catch (err) {
    console.error('error:', err)
    yield put(setError(err))
  }
}

function * saveUser (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(insertUser, action.payload)
    if (response.status === 200) {
      yield put(setAddStatus(true))
      alert('Successfully Registered')
    } else {
      alert(response)
    }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

function * getNewToken () {
  try {
    const accessToken = localStorage.getItem('accessToken') ?? ''
    const user = localStorage.getItem('email') ?? ''
    const response: ResponseGenerator = yield call(refreshUserToken, user, accessToken)
    if (response.status === 200) {
      yield put(setAccessToken(response.headers.accesskey))
    } else {
      yield put(unSetUser())
    }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

export function * UserSaga () {
  yield takeEvery(getUser.type, findUser)
  yield takeEvery(addUser.type, saveUser)
  yield takeEvery(refreshUser.type, getNewToken)
}
