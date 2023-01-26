import { spawn } from 'redux-saga/effects';
import studentSaga from "./Pages/Students/studentSaga";

export default function* rootSaga() {
    yield spawn(studentSaga);
}