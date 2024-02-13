import { addUserRequest, 
         addUserPasswordRequest, 
         loginRequest, 
         selfRegisterRequest, 
         loginSuccess, 
         logoutRequest ,
         authCheckRequest,
            authCheckSuccess,
            authCheckFailure
        } from "../slices/userSlice";
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { IUser } from "../slices/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { backendURL } from "../../constants";


function* addUserSaga(action: PayloadAction<IUser>) {
    try {
        yield call(axios.post, `${backendURL}/auth`, action.payload, {withCredentials: true});
    } catch (error) {
        console.log(error);
    }
}

function* addUserPasswordSaga(action: PayloadAction<{token: string, password: string}>) {
    try {
        console.log(action.payload);
        const user = yield call(axios.patch, `${backendURL}/users`, action.payload, {withCredentials: true});
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

function* loginSaga(action: PayloadAction<{email: string, password: string}>) {
    try {
        const user = yield call(axios.post, `${backendURL}/users/login`, action.payload, {withCredentials: true});
        const currentUser: IUser = {
            name: user.data.name,
            email: user.data.email,
            role: user.data.role
        
        };
        // localStorage.setItem('currentUser', JSON.stringify(currentUser));
        yield put(loginSuccess(currentUser));
        yield put(authCheckSuccess(currentUser));
        // console.log(JSON.parse(localStorage.getItem('currentUser')))
    } catch (error) {
        yield put(authCheckFailure(new Error('User not authorized')));  
        console.log(error);
    }

}

function* selfRegisterSaga(action: PayloadAction<{name: string, email: string, password: string}>) {
    try {
        yield call(axios.post, `${backendURL}/users/selfRegister`, action.payload, {withCredentials: true});
        console.log(action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* logoutSaga() {
    try {
        yield call(axios.post, `${backendURL}/users/logout`, null, {withCredentials: true});
        yield put(loginSuccess(null));
        yield put(authCheckFailure(new Error('User not authorized')));
        // localStorage.removeItem('currentUser');
    } catch (error) {
        console.log(error);
    }
}

function* authCheckSaga() {
    try {
        const user = yield call(axios.get, `${backendURL}/auth`, {withCredentials: true});
        const currentUser: IUser = {
            name: user.data.name,
            email: user.data.email,
            role: user.data.role
        };
        if (user) {
            yield put(authCheckSuccess(currentUser));
            console.log(currentUser)
        }
        else {
            yield put(authCheckFailure(new Error('User not authorized')));
        } 
    }catch (error) {
        console.log(error);
        }
    }

export function* userSaga() {
    yield takeLatest(addUserRequest, addUserSaga)
    yield takeLatest(addUserPasswordRequest, addUserPasswordSaga)
    yield takeLatest(loginRequest, loginSaga)
    yield takeLatest(selfRegisterRequest, selfRegisterSaga)
    yield takeLatest(logoutRequest, logoutSaga)
    yield takeLatest(authCheckRequest, authCheckSaga)
}