import { takeEvery, put, call } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { User } from '../../interfaces/interfaces'
import {  addUserr, deleteUser, getUsers, updateUser } from '../../api/api'
import { addUserRecord, addUserRecordFailure, addUserRecordSuccess, deleteUserRecord, deleteUserRecordFailure, deleteUserRecordSuccess, getUserRecords, getUserRecordsFailure, getUserRecordsSuccess, updateUserRecord, updateUserRecordFailure, updateUserRecordSuccess } from './homeSlice'
import axios from 'axios'
import { modifyAdd, modifyUpdate, socket, validationFunc } from '../../services/services'

interface Action {
  type: string
  payload: User
}


function* getUserRecordsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(() => getUsers())
    console.log('line 21 saga', response.data)
    const responceData = response.data.map((item: any) => {
      item.dob = new Date(item.dob)
      return item
    })
    const users = responceData.map((item: any) => {
      return { ...item, inEdit: false }
    })
    yield put(getUserRecordsSuccess(users))
  } catch (error) {
    yield put(getUserRecordsFailure(error))
    toast.error('Something went wrong!')
  }
}

function* addUserSaga(action: Action): Generator<any, any, any> {
  try {
    if (validationFunc(action.payload)) {
        const modifiedData = modifyAdd(action.payload)
        console.log('line 37 saga', modifiedData)
        const response = yield call(() => addUserr(modifiedData))
        const addedUser = response.data
        console.log('line 39 saga', addedUser.name)
        yield put(addUserRecordSuccess({...addedUser, inEdit: false}))
        socket.emit('user_added', { name: addedUser.name })
        toast.success('User added successfully!')
    }
  } catch (error) {
    yield put(addUserRecordFailure(error))
    console.log('line 45 saga', error)
    toast.error('Something went wrong!')
  }
}
function* deleteUserSaga(action: Action): Generator<any, any, any> {
  try {
    const name = action.payload.name
     yield call(() => deleteUser(action.payload))
    yield put(deleteUserRecordSuccess(action.payload))
    socket.emit('user_removed', { name: name } )
  } catch (error) {
    yield put(deleteUserRecordFailure(error))
    toast.error('Something went wrong!')
  }
}
function* updateUserSaga(action: Action): Generator<any, any, any> {
  try {
    if(validationFunc(action.payload)) {
        const modifiedData = modifyUpdate(action.payload)
        const response = yield call(() => updateUser(modifiedData))
        const updatedUser = response.data
        console.log('line 64 update saga', updatedUser)
        yield put(updateUserRecordSuccess(updatedUser))
        socket.emit('user_updated', { name: updatedUser.name })
    }
  } catch (error) {
    yield put(updateUserRecordFailure(error))
    toast.error('Something went wrong!')
  }
}


export default function* homeSaga() {
    yield takeEvery(getUserRecords, getUserRecordsSaga)
    yield takeEvery(addUserRecord, addUserSaga)
    yield takeEvery(deleteUserRecord, deleteUserSaga)
    yield takeEvery(updateUserRecord, updateUserSaga)
}
