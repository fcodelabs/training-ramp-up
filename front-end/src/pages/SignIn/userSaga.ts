import { takeEvery, put, call } from 'redux-saga/effects'
import api from '../../api'
import { signUpUser, signUpUserSuccess, signUpUserFailure } from './userSlice'
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
  console.log('action :', action)
  console.log('hi')
  try {
    const response = yield call(() => api.user.signUp(action.payload))
    console.log('responce :', response)
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

export default function* userSaga() {
  yield takeEvery(signUpUser, signUpUserSaga)
}
