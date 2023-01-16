/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { put, takeEvery, all, call, take, cancelled, takeLatest } from 'redux-saga/effects'


import { eventChannel, EventChannel } from 'redux-saga'
import { Person } from '../../helpers/interface'
import { addPersonDataFailure, addPersonDataSuccess, getPersonDataFailure, getPersonDataSuccess } from './PersonDataSlice'
import { publicRequest } from '../../utils/requestMethods'
// worker Saga: will be fired on USER_FETCH_REQUESTED actions

// function getPersonData() {
//   const q = query(collection(db, 'messages'), orderBy('time', 'asc'))
//   return eventChannel((emitter) => {
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let msgList: msgData[] = []

//       querySnapshot.forEach((doc) => {
//         msgList.push({
//           Id: doc.id,
//           title: doc.data().title,
//           name: doc.data().name,
//           description: doc.data().description,
//           colour: doc.data().colour,
//           time: doc.data().time,
//         })
//       })
//       // console.log(cardList)
//       emitter(msgList)
//     })
//     return unsubscribe
//   })
// }

const postNewMessage = async (newMsg: {
  name: any
  title: any
  description: any
  colour: any
  time: any
}) => {
 try {
    const res = await publicRequest.get(`/user`, user);
    console.log(res.data);
    
  } catch (err) {
   return err;
  }
}

const postNewMessage = async (newMsg: {
  name: any
  title: any
  description: any
  colour: any
  time: any
}) => {
 try {
    const res = await publicRequest.get(`/user`, user);
    console.log(res.data);
    
  } catch (err) {
   return err;
  }
}



// function* fetchPersonDataa() {
//   const chan: EventChannel<Person[]> = yield call(getPersonData)
//   try {
//     while (true) {
//       const personDataArray: Person[] = yield take(chan)
//       yield put(getPersonDataSuccess(personDataArray))
//     }
//   } finally {
//     // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//     if (yield cancelled()) {
//       chan.close()
//     }
//   }
// }
// getDataSucces
function* fetchPersonData() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const personDataArray: Person[] = yield getAlldata()
     yield put(getPersonDataSuccess(personDataArray));
  } catch (e) {
    yield put(getPersonDataFailure(e))
  }
}

// addNewDataSucces
function* addNewPersonSaga(action: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const msg = yield postNewMessage(action.payload)
     yield put(addPersonDataSuccess(msg));
  } catch (e) {
    yield put(addPersonDataFailure())
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* getAllPerson() {
  yield takeEvery('message/getMsgStart', fetchPersonData) // fetchMessages
}
// eslint-disable-next-line require-yield
function* addNewPerson() {
  yield takeLatest('message/addMsgStart', addNewPersonSaga)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([addNewPerson(), getAllPerson()])
}
