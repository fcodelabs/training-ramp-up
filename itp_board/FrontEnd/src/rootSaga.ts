import { spawn } from 'redux-saga/effects';
import studentSaga from "./pages/students/studentSaga";

export default function* rootSaga() {
    yield spawn(studentSaga);
}