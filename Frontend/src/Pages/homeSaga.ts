import { takeEvery, put, call } from "redux-saga/effects";
import { Student } from "../utils/interface";
import { calcAge } from "../utils/services";
import { toast } from "react-toastify";
import axios from "../axios";
import {
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  addStudent,
  addStudentSuccess,
  addStudentFailure,
  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFailure,
  updateStudent,
  updateStudentSuccess,
  updateStudentFailure,
} from "./homeSlice";

function* getStudentsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(() => axios.get("student"));
    const students: Student[] = response.data;
    const modified = students.map((student) => {
      return {
        ...student,
        inEdit: false,
      };
    });
    yield put(getStudentsSuccess(modified));
  } catch (error) {
    toast.error("Something went wrong");
    yield put(getStudentsFailure(error));
  }
}

function* addStudentSaga(action: any): Generator<any, any, any> {
  try {
    const data = {
      name: action.payload.name,
      address: action.payload.address,
      birthday: action.payload.birthday,
      gender: action.payload.gender,
      mobile: action.payload.mobile,
      age: calcAge(action.payload.birthday),
    };
    const response = yield call(() => axios.post("student", data));
    const student: Student = response.data;
    yield put(addStudentSuccess({ ...student, inEdit: false }));
  } catch (error) {
    toast.error("Error in adding student");
    yield put(addStudentFailure(error));
  }
}

function* deleteStudentSaga(action: any): Generator<any, any, any> {
  try {
    yield call(() => axios.delete(`student/${action.payload}`));
    yield put(deleteStudentSuccess(action.payload));
  } catch (error) {
    toast.error("Error in deleting student");
    yield put(deleteStudentFailure(error));
  }
}

function* updateStudentSaga(action: any): Generator<any, any, any> {
  try {
    const element = {
      name: action.payload.name,
      address: action.payload.address,
      age: action.payload.age,
      birthday: action.payload.birthday,
      gender: action.payload.gender,
      mobile: action.payload.mobile,
    };
    yield call(() => axios.patch(`student/${action.payload.id}`, element));

    yield put(updateStudentSuccess(action.payload));
  } catch (error) {
    toast.error("Error in updating student");
    yield put(updateStudentFailure(error));
  }
}

function* homeSaga() {
  yield takeEvery(getStudents, getStudentsSaga);
  yield takeEvery(addStudent, addStudentSaga);
  yield takeEvery(deleteStudent, deleteStudentSaga);
  yield takeEvery(updateStudent, updateStudentSaga);
}

export default homeSaga;
