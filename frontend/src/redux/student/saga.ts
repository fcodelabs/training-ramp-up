import { all, call, put, take, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  setLoading,
  getAllStudentsSuccess,
  getAllStudentsFailure,
} from "./slice";

interface IStudent {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mobile: string;
  dob: Date;
  isNew?: boolean;
}

const BASE_URL = "http://localhost:5000/student";

function* getAllStudentsWorker(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const response = yield call(axios.get, `${BASE_URL}/allStudents`);
    yield put(getAllStudentsSuccess(response.data));
  } catch (error) {
    yield put(getAllStudentsFailure(error as string));
  }
}

function* getAllStudentsWatcher() {
  yield takeEvery("student/getAllStudents", getAllStudentsWorker);
}

export default function* studentSaga() {
  yield all([getAllStudentsWatcher()]);
}
