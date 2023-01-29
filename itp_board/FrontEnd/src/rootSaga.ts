import { spawn } from 'redux-saga/effects';
import studentSaga from './pages/students/studentSaga';
import signInSaga from './pages/signIn/signInSaga';

export default function* rootSaga() {
    yield spawn(studentSaga);
    yield spawn(signInSaga);
}