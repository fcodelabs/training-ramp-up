import { addUserRequest, 
         addUserPasswordRequest, 
         loginRequest, 
         selfRegisterRequest, 
         loginSuccess, 
         logoutRequest } from "../slices/userSlice";
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { IUser } from "../slices/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";


function* addUserSaga(action: PayloadAction<IUser>) {
    try {
        yield call(axios.post, 'http://localhost:5000/auth', action.payload, {withCredentials: true});
    } catch (error) {
        console.log(error);
    }
}

function* addUserPasswordSaga(action: PayloadAction<{token: string, password: string}>) {
    try {
        console.log(action.payload);
        const user = yield call(axios.patch, `http://localhost:5000/users`, action.payload, {withCredentials: true});
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

function* loginSaga(action: PayloadAction<{email: string, password: string}>) {
    try {
        const user = yield call(axios.post, `http://localhost:5000/users/login`, action.payload, {withCredentials: true});
        const currentUser: IUser = {
            name: user.data.name,
            email: user.data.email,
            role: user.data.role
        
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        yield put(loginSuccess(currentUser));
    } catch (error) {
        console.log(error);
    }

}

function* selfRegisterSaga(action: PayloadAction<{name: string, email: string, password: string}>) {
    try {
        yield call(axios.post, `http://localhost:5000/users/selfRegister`, action.payload, {withCredentials: true});
    } catch (error) {
        console.log(error);
    }
}

function* logoutSaga() {
    try {
        yield call(axios.post, `http://localhost:5000/users/logout`, null, {withCredentials: true});
        localStorage.removeItem('currentUser');
    } catch (error) {
        console.log(error);
    }
}

export function* userSaga() {
    yield takeLatest(addUserRequest, addUserSaga)
    yield takeLatest(addUserPasswordRequest, addUserPasswordSaga)
    yield takeLatest(loginRequest, loginSaga)
    yield takeLatest(selfRegisterRequest, selfRegisterSaga)
    yield takeLatest(logoutRequest, logoutSaga)
}