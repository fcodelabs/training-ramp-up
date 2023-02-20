import { takeEvery, put, call } from 'redux-saga/effects'
import { signUp, signIn, signOut } from '../../api/userAPI'
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure,
  signInUser,
  signInUserFailure,
  signInUserSuccess,
  signOutUser,
  signOutUserFailure,
  signOutUserSuccess,
} from './userSlice'
import { toast } from 'react-toastify'
interface UserSignUp {
  email: string
  password: string
}

interface signUpUserAction {
  type: string
  payload: UserSignUp
}

function* signUpUserSaga(action: signUpUserAction): Generator<any, any, any> {
  try {
    const response = yield call(signUp, action.payload)

    if (response.status == 201) {
      yield put(signUpUserSuccess(response.data.data))
      toast.success('Registration Succesfull!')
      window.location.href = '/'
    } else if (response.status == 200) {
      toast.error('Email already registered!')
      yield put(signUpUserFailure(response.data.data))
    } else {
      yield put(signUpUserFailure(response.data.data))
    }
  } catch (error) {
    yield put(signUpUserFailure(error))
  }
}

function* signInUserSaga(action: signUpUserAction): Generator<any, any, any> {
  try {
    const response = yield call(signIn, action.payload)

    if (response.status == 200) {
      const userRole = response.data.userRole
      const email = response.data.email
      const user = { email, userRole }
      yield put(signInUserSuccess(user))
      sessionStorage.setItem('accessToken', response.data.accessToken)
      toast.success('Login Succesfull!')
      window.location.href = '/grid'
    } else {
      toast.error('Invalid Credentials!')
      yield put(signInUserFailure(response))
    }
  } catch (error: any) {
    yield put(signInUserFailure(error))
  }
}

function* logoutUserSaga(): Generator<any, any, any> {
  try {
    yield call(signOut)

    sessionStorage.removeItem('accessToken')
    yield put(signOutUserSuccess())
  } catch (error: any) {
    yield put(signOutUserFailure(error))
  }
}

export default function* userSaga() {
  yield takeEvery(signUpUser, signUpUserSaga)
  yield takeEvery(signInUser, signInUserSaga)
  yield takeEvery(signOutUser, logoutUserSaga)
}
