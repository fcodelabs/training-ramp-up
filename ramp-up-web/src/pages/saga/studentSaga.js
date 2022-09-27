import studentSlice from "../slice/studentSlice";
import { all, takeEvery, put, call } from "redux-saga/effects";
import { getItems, updateStudent } from "../../utils/services";

function* studentGetFun() {
  const res = yield call(getItems);
  console.log("ResStudent", res);
  yield put(studentSlice.actions.saveStudent(res));
}

// function* watchGetUser() {
//   const response = yield call(findUser);

//   yield put(userSlice.actions.saveUser(response));
// }

export function* callStudentFun() {
  yield takeEvery(studentSlice.actions.getStudents, studentGetFun);
  //   yield takeEvery(userSlice.actions.getUsers, watchGetUser);
}
