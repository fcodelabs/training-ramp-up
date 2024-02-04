import { addUserRequest, addUserEmail, addUserPasswordRequest, loginRequest, selfRegisterRequest } from "../slices/userSlice";
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { IUser } from "../slices/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";


function* addUserSaga(action: PayloadAction<IUser>) {
    try {
        const user = yield call(axios.post, 'http://localhost:5000/users', action.payload);
        // console.log(user)
        yield put(addUserEmail(user.data.email));
    } catch (error) {
        console.log(error);
    }
}

function* addUserPasswordSaga(action: PayloadAction<{token: string, password: string}>) {
    try {
        const user = yield call(axios.patch, `http://localhost:5000/users`, action.payload);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

function* loginSaga(action: PayloadAction<{email: string, password: string}>) {
    try {
        console.log(action.payload);
        const user = yield call(axios.post, `http://localhost:5000/users/login`, action.payload);
        console.log(user.data);
    } catch (error) {
        console.log(error);
    }

}

function* selfRegisterSaga(action: PayloadAction<{name: string, email: string, password: string}>) {
    try {
        yield call(axios.post, `http://localhost:5000/users/selfRegister`, action.payload);
    } catch (error) {
        console.log(error);
    }
}

export function* userSaga() {
    yield takeLatest(addUserRequest, addUserSaga)
    yield takeLatest(addUserPasswordRequest, addUserPasswordSaga)
    yield takeLatest(loginRequest, loginSaga)
    yield takeLatest(selfRegisterRequest, selfRegisterSaga)
}