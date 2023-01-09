import { call, put, takeEvery } from 'redux-saga/effects'
import {
  setUser,
  getUser,
  addUser,
  setError,
  setAddStatus,
  unSetUser,
  logoutUser
} from '../slices/UserSlice'
import { getAUser, insertUser, logoutUserSession } from '../services/UserOperations'
import { AnyAction } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../utils/interface'

function * findUser (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(getAUser, action.payload)
    if (response.status === 200) {
      yield put(setUser(response.data))
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
    console.error('error:', err)
    yield put(setError(err))
  }
}

function * signoutUser (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(logoutUserSession)
    if (response.status === 200) {
      yield put(unSetUser())
    }
  } catch (err) {
    console.error('error:', err)
    yield put(setError(err))
  }
}

// function * getNewToken () {
//   try {
//     const response: ResponseGenerator = yield call(refreshUserToken)
//     if (response.status === 401) {
//       yield put(unSetUser())
//     }
//   } catch (err) {
//     console.error('error:', err)
//     yield put(setError(err))
//   }
// }

export function * UserSaga () {
  yield takeEvery(getUser.type, findUser)
  yield takeEvery(addUser.type, saveUser)
  yield takeEvery(logoutUser.type, signoutUser)
  // yield takeEvery(refreshUser.type, getNewToken)
}
