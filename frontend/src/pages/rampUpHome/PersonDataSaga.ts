/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { put, takeEvery, all, call, take, takeLatest } from 'redux-saga/effects'
import { eventChannel, EventChannel } from 'redux-saga'
import { Person } from '../../helpers/interface'
import {
  addPersonDataFailure,
  addPersonDataSuccess,
  deletePersonDataFailure,
  deletePersonDataSuccess,
  getPersonDataFailure,
  getPersonDataSuccess,
  updatePersonDataFailure,
  updatePersonDataSuccess,
} from './PersonDataSlice'
import {
  addNewPersonService,
  deletePersonService,
  getAllPersonServise,
  updatePersonService,
} from '../../services/PersonServices'
import { getNotificationSuccess } from './NotificationSlice'
import { io, Socket } from 'socket.io-client'

// get notifications with event chanell
const getAllNotifications = (Socket: Socket) => {
  Socket.on('disconect', () => {
    Socket.connect()
  })
  return eventChannel((emit: (arg0: string) => void) => {
    Socket.on('notification', (data: string) => {
      emit(data)
    })
    return () => {
      Socket.off('notification')
    }
  })
}

function* fetchNotications() {
  const socket = io('http://localhost:5000')
  const chan: EventChannel<string> = yield call(getAllNotifications, socket)
  try {
    while (true) {
      const notificationArray: string = yield take(chan)
      yield put(getNotificationSuccess(notificationArray))
    }
  } finally {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    chan.close()
  }
}

// getDataSucces
function* fetchPersonData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const personDataArray: Person[] = yield getAllPersonServise()
    yield put(getPersonDataSuccess(personDataArray))
  } catch (e) {
    yield put(getPersonDataFailure())
  }
}

// addNewDataSucces
function* addNewPersonSaga(action: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const insertData: Person = yield addNewPersonService(action.payload)
    yield put(addPersonDataSuccess(insertData))
  } catch (e) {
    yield put(addPersonDataFailure())
  }
}

// addNewDataSucces
function* updatePersonSaga(action: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateData: Person = yield updatePersonService(action.payload)
    yield put(updatePersonDataSuccess(updateData))
  } catch (e) {
    yield put(updatePersonDataFailure())
  }
}
// addNewDataSucces
function* deletePersonSaga(action: any) {
  try {
    console.log('sdsdf')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteData: Person = yield deletePersonService(action.payload)
    yield put(deletePersonDataSuccess(deleteData))
  } catch (e) {
    yield put(deletePersonDataFailure())
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* getAllPerson() {
  yield takeEvery('personData/getPersonDataStart', fetchPersonData) // fetchMessages
}
function* deletePerson() {
  yield takeLatest('personData/deletePersonDataStart', deletePersonSaga) // fetchMessages
}
function* addNewPerson() {
  yield takeLatest('personData/addPersonDataStart', addNewPersonSaga)
}

function* getNotifications() {
  yield takeEvery('notification/getNotificationStart', fetchNotications)
}
function* updatePerson() {
  yield takeLatest('personData/updatePersonDataStart', updatePersonSaga)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([getAllPerson(), getNotifications(), updatePerson(), addNewPerson(), deletePerson()])
}
