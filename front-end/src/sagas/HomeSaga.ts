import { call, put, takeEvery } from 'redux-saga/effects'
import {
  setAllStudents,
  getAllStudents,
  addStudent,
  editStudent,
  removeStudent,
  setError
} from '../slices/HomeSlice'
import {
  deletePerson,
  getPersons,
  insertPerson,
  updatePerson
} from '../services/PersonTableViewOperations'
import { AnyAction } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../utils/interface'
// import { getUserState } from '../slices/UserSlice'

function * getStudents () {
  try {
    // const user: ResponseGenerator = yield select(getUserState)
    // const accessToken = user.payload.user.accessToken
    const response: ResponseGenerator = yield call(getPersons)
    if (response.status === 200) {
      yield put(setAllStudents(response.data))
    } else if (response.status === 401) {
      alert(response)
    }
    // else {
    //   yield put(refreshUser())
    //   yield put(getAllStudents())
    // }
  } catch (err) {
    console.error('error:', err)
    yield put(setError(err))
  }
}

function * saveStudent (action: AnyAction) {
  try {
    // const user: ResponseGenerator = yield select(getUserState)
    // const accessToken = user.payload.user.accessToken
    const response: ResponseGenerator = yield call(insertPerson, action.payload)
    if (response.status === 201) {
      yield put(getAllStudents())
    } else if (response.status === 401) {
      alert(response)
    }
    // else {
    //   yield put(refreshUser())
    //   yield put(addStudent(action.payload))
    // }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

function * updateStudent (action: AnyAction) {
  try {
    // const user: ResponseGenerator = yield select(getUserState)
    // const accessToken = user.payload.user.accessToken
    const response: ResponseGenerator = yield call(updatePerson, action.payload)
    if (response.status === 200) {
      yield put(getAllStudents())
    } else if (response.status === 401) {
      alert(response)
    }
    // else {
    //   yield put(refreshUser())
    //   yield put(editStudent(action.payload))
    // }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

function * deleteStudent (action: AnyAction) {
  try {
    // const user: ResponseGenerator = yield select(getUserState)
    // const accessToken = user.payload.user.accessToken
    const response: ResponseGenerator = yield call(deletePerson, action.payload)
    if (response.status === 200) {
      yield put(getAllStudents())
    } else if (response.status === 401) {
      alert(response)
    }
    // else {
    //   yield put(refreshUser())
    //   yield put(removeStudent(action.payload))
    // }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

export function * HomeSaga () {
  yield takeEvery(getAllStudents.type, getStudents)
  yield takeEvery(addStudent.type, saveStudent)
  yield takeEvery(editStudent.type, updateStudent)
  yield takeEvery(removeStudent.type, deleteStudent)
}
