import { spawn } from 'redux-saga/effects';
import studentSaga from './pages/students/studentSaga';
import signInSaga from './pages/signIn/signInSaga';
import signUpSaga from "./pages/signUp/signUpSaga";

export default function* rootSaga() {
    yield spawn(studentSaga);
    yield spawn(signInSaga);
    yield spawn(signUpSaga);
}