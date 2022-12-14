import { call, put, takeEvery } from 'redux-saga/effects'
import {
  setAllStudents,
  getAllStudents,
  addStudent,
  editStudent,
  removeStudent,
  setError
} from './HomeSlice'
import {
  deletePerson,
  getPersons,
  insertPerson,
  updatePerson
} from '../../Component/PersonTableView/services/PersonTableViewOperations'
import { AnyAction } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../../utils/interface'

function * getStudents () {
  try {
    const response: ResponseGenerator = yield call(getPersons)
    yield put(setAllStudents(response))
  } catch (err) {
    console.error('error:', err)
    yield put(setError(err))
  }
}

function * saveStudent (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(insertPerson, action.payload)
    if (response !== null) {
      yield put(getAllStudents())
    }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

function * updateStudent (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(updatePerson, action.payload)
    if (response !== null) {
      yield put(getAllStudents())
    }
  } catch (err) {
    console.error('socket error:', err)
    yield put(setError(err))
  }
}

function * deleteStudent (action: AnyAction) {
  try {
    const response: ResponseGenerator = yield call(deletePerson, action.payload)
    if (response !== null) {
      yield put(getAllStudents())
    }
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
