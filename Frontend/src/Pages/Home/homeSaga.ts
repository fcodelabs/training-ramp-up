import { takeEvery, put, call } from "redux-saga/effects";
import { Student } from "../../utils/interface";
import { calcAge } from "../../utils/services";
import { toast } from "react-toastify";
import {
  getStudentsService,
  addStudentService,
  deleteStudentService,
  updateStudentService,
} from "../../utils/apiService";
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
} from "../Home/homeSlice";

interface Action {
  type: string;
  payload: Student;
}

interface ActionId {
  type: string;
  payload: number;
}

function* getStudentsSaga() {
  try {
    const response: Student[] = yield call(getStudentsService);

    yield put(getStudentsSuccess(response));
  } catch (error) {
    toast.error("Something went wrong");
    yield put(getStudentsFailure(error));
  }
}

function* addStudentSaga(action: Action) {
  try {
    const data: Student = {
      name: action.payload.name,
      address: action.payload.address,
      birthday: action.payload.birthday,
      gender: action.payload.gender,
      mobile: action.payload.mobile,
      age: calcAge(action.payload.birthday),
    };
    yield call(addStudentService, data);
    const student: Student[] = yield call(getStudentsService);
    yield put(addStudentSuccess(student));
  } catch (error) {
    toast.error("Error in adding student");
    yield put(addStudentFailure(error));
  }
}

function* deleteStudentSaga(action: ActionId) {
  try {
    if (!action.payload) return toast.error("Error in deleting student");
    const id: number = action.payload;
    yield call(deleteStudentService, id);
    const students: Student[] = yield call(getStudentsService);
    yield put(deleteStudentSuccess(students));
  } catch (error) {
    toast.error("Error in deleting student");
    yield put(deleteStudentFailure(error));
  }
}

function* updateStudentSaga(action: Action) {
  try {
    if (!action.payload.id) return toast.error("Error in updating student");
    const element: Student = {
      name: action.payload.name,
      address: action.payload.address,
      age: calcAge(action.payload.birthday),
      birthday: action.payload.birthday,
      gender: action.payload.gender,
      mobile: action.payload.mobile,
    };
    yield call(updateStudentService, action.payload.id, element);
    const students: Student[] = yield call(getStudentsService);

    yield put(updateStudentSuccess(students));
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
