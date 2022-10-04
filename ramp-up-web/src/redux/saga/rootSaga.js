import studentSlice from "../slice/studentSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  insertStudent,
  updateStudent,
  deleteStudent,
  getStudents,
} from "../../services/studentServices.js";
import userSlice from "../slice/userSlice";
import {insertUser, findUser} from "../../services/userService"

function* watchRetrieveStudent() {
  try {
    const response = yield call(getStudents);
    yield put(studentSlice.actions.saveStudents(response));
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line no-useless-rename
function* watchInsertStudent({ payload: payload }) {
  try {
    yield call(insertStudent, payload);
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line no-useless-rename
function* watchPutStudent({ payload: payload }) {
  try {
    yield call(updateStudent, payload);
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line no-useless-rename
function* watchRemoveStudent({ payload: payload }) {
  try {
    yield call(deleteStudent, payload);
    
  } catch (error) {
    console.log(error);
  }
}

// eslint-disable-next-line no-useless-rename
function* watchSignUser({ payload: payload}){
  console.log("root saga")
  console.log("payload",payload)
  try {
    const response = yield call(findUser, payload);
    yield put(userSlice.actions.saveUser(response.data));
    localStorage.setItem("role", response.data.user.role);
    localStorage.setItem("token",response.data.accessToken)
    localStorage.setItem("email" , response.data.email)
   payload.navigate("/home");
  } catch (error) {
    alert(error);
  }
}

// eslint-disable-next-line no-useless-rename
function* watchInsertUser({ payload: payload}){

 
  try {
   
    yield call(insertUser, payload);
    payload.navigate("/");
  } catch (error) {
    console.log(error);
  }
}


export function* postSagas() {
  yield takeEvery(studentSlice.actions.retrieveStudents, watchRetrieveStudent);
  yield takeEvery(studentSlice.actions.insertStudent, watchInsertStudent);
  yield takeEvery(studentSlice.actions.putStudent, watchPutStudent);
  yield takeEvery(studentSlice.actions.removeStudent, watchRemoveStudent);
  yield takeEvery(userSlice.actions.insertUser, watchInsertUser);
  yield takeEvery(userSlice.actions.signInUser,watchSignUser);
}

export default function* rootSaga() {
  yield all([...postSagas()]);
}
