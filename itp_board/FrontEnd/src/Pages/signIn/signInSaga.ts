import { put, takeEvery, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  changeAdmin,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeSignInUser,
  signInUser,
  signOutUser,
} from './signInSlice'
import { changeNewAdded } from '../students/studentSlice'
import { ResponseObj, tempResp, UserCredetial } from '../../utils/types'
import { checkCredentials, signOut } from '../../apis/userAPIs'
import { displayErrors } from '../../utils/toasts'
import { AxiosError } from 'axios'

function* signOut_() {
  try {
    yield call(signOut)
    yield put(changeFirstName(''))
    yield put(changeLastName(''))
    yield put(changeEmail(''))
    yield put(changeNewAdded(false))
    yield put(changeAdmin(false))
    yield put(changeSignInUser(false))
  } catch (error) {
    console.error(error)
    displayErrors(['Unexpected Error'])
  }
}

function* signIn(action: PayloadAction<UserCredetial>) {
  let response: ResponseObj | null = null
  const { navigate } = action.payload
  try {
    response = yield call(checkCredentials, action.payload)
    if (response) {
      const { data, authorized } = response
      if (authorized) {
        yield put(changeEmail(action.payload.email))
        yield put(changeFirstName(data.firstName))
        yield put(changeAdmin(data.admin))
        yield put(changeLastName(data.lastName))
        navigate('/students')
      } else {
        yield put(changeFirstName(''))
        yield put(changeLastName(''))
        yield put(changeEmail(''))
        yield put(changeAdmin(false))
        yield put(changeSignInUser(false))
        displayErrors(['Invalid Email or Password'])
      }
    }
  } catch (error) {
    console.error(error)
    displayErrors(['Unexpected Error'])
    yield call(signOut_)
  }
}

export default function* signInSaga() {
  yield takeEvery(signInUser, signIn)
  yield takeEvery(signOutUser, signOut_)
}
