import { put, takeEvery, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { Student } from '../../utils/types'
import { AxiosError } from 'axios'

import {
  changeEditId,
  changeNewAdded,
  editData,
  startGetData,
  startDataEditing,
  successGetData,
  successAddNew,
  startAddNew,
  startRemove,
  successRemove,
  RemoveData,
} from './studentSlice'
import { createData, deleteData, fetchData, updateData } from '../../apis/studentApi'
import { displayErrors } from '../../utils/toasts'

function* get() {
  try {
    const data: Student[] = yield call(fetchData)
    yield put(editData(data))
    yield put(successGetData())
  } catch (error) {
    const err = error as AxiosError
    console.error(err)
    displayErrors(['Unexpected error'])
    yield put(editData([]))
  }
}

function* create(action: PayloadAction<Student>) {
  const record = action.payload
  try {
    yield call(createData, record)
    yield put(changeEditId(null))
    yield put(changeNewAdded(false))
    yield put(successAddNew())
  } catch (error) {
    console.error(error)
    displayErrors(['Unexpected error'])
  }
}

function* update(action: PayloadAction<Student>) {
  const record = action.payload
  try {
    yield call(updateData, record)
    yield put(changeEditId(null))
    yield put(changeNewAdded(false))
  } catch (error) {
    console.error(error)
    displayErrors(['Unexpected error'])
  }
}

function* remove(action: PayloadAction<number>) {
  try {
    yield call(deleteData, action.payload)
    yield put(RemoveData(action.payload))
    yield put(successRemove())
  } catch (error) {
    console.error(error)
    displayErrors(['Unexpected Error!!!'])
  }
}

export default function* studentSaga() {
  yield takeEvery(startGetData, get)
  yield takeEvery(startAddNew, create)
  yield takeEvery(startDataEditing, update)
  yield takeEvery(startRemove, remove)
}
