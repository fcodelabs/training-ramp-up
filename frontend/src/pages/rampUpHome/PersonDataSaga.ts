/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { put, takeEvery, call, take } from 'redux-saga/effects'
import { eventChannel, EventChannel } from 'redux-saga'
import { Person } from '../../models/interface'
import {
  addPersonDataFailure,
  addPersonDataStart,
  addPersonDataSuccess,
  deletePersonDataFailure,
  deletePersonDataStart,
  deletePersonDataSuccess,
  getPersonDataFailure,
  getPersonDataStart,
  getPersonDataSuccess,
  updatePersonDataFailure,
  updatePersonDataStart,
  updatePersonDataSuccess,
} from './personDataSlice'
import {
  addNewPersonService,
  deletePersonService,
  getAllPersonServise,
  updatePersonService,
} from '../../services/personServices'
import { getNotificationStart, getNotificationSuccess } from './notificationSlice'
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
    alert(e)
    yield put(getPersonDataFailure())
  }
}

// addNewDataSucces
function* addNewPersonSaga(payload: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const insertData: Person = yield addNewPersonService(payload)
    yield put(addPersonDataSuccess(insertData))
  } catch (e) {
    alert(e)
    yield put(addPersonDataFailure())
  }
}

// addNewDataSucces
function* updatePersonSaga(payload: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateData: Person = yield updatePersonService(payload)
    yield put(updatePersonDataSuccess(updateData))
  } catch (e) {
    alert(e)
    yield put(updatePersonDataFailure())
  }
}
// addNewDataSucces
function* deletePersonSaga(payload: any) {
  try {
    const deleteData: Person = yield deletePersonService(payload)
    yield put(deletePersonDataSuccess(deleteData))
  } catch (e) {
    alert(e)
    yield put(deletePersonDataFailure())
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* handlePersonActions() {
  yield takeEvery(
    (action: any) => action.type.match('Person'),
    function* ({ type, payload }) {
      switch (type) {
        case getPersonDataStart.type:
          yield fetchPersonData()
          break
        case deletePersonDataStart.type:
          yield deletePersonSaga(payload)
          break
        case addPersonDataStart.type:
          yield addNewPersonSaga(payload)
          break
        case updatePersonDataStart.type:
          yield updatePersonSaga(payload)
          break
      }
    },
  )
}

export function* getNotifications() {
  yield takeEvery(getNotificationStart, fetchNotications)
}