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
  navigate: (path: string) => void
}

interface signUpUserAction {
  type: string
  payload: UserSignUp
}

function* signUpUserSaga(action: signUpUserAction): Generator<any, any, any> {
  try {
    const { navigate } = action.payload
    const response = yield call(signUp, action.payload)
    yield put(signUpUserSuccess(response.data))
    toast.success('Registration Succesfull!')
    navigate('/')
    // window.location.href = '/'
  } catch (error: any) {
    if (error.response.status === 400) {
      // Handle 400 error response here
      toast.error('User Already Exists!')
      yield put(signUpUserFailure(error.response.data))
    } else {
      yield put(signUpUserFailure(error.response.data))
    }
  }
}

function* signInUserSaga(action: signUpUserAction): Generator<any, any, any> {
  try {
    const response = yield call(signIn, action.payload)
    const userRole = response.data.userRole
    const email = response.data.email
    const user = { email, userRole }
    yield put(signInUserSuccess(user))
    sessionStorage.setItem('accessToken', response.data.accessToken)
    toast.success('Login Succesfull!')
  } catch (error: any) {
    if (error.response.status === 401) {
      // Handle 400 error response here
      toast.error('Invalid Credentials!')
      yield put(signInUserFailure(error.response.data))
    } else {
      yield put(signInUserFailure(error.response.data))
    }
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
