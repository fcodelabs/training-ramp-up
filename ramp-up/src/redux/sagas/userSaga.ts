import { addUserRequest, addUserEmail } from "../slices/userSlice";
import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { IUser } from "../slices/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";


function* addUserSaga(action: PayloadAction<IUser>) {
    try {
        console.log(action.payload);
        const user = yield call(axios.post, 'http://localhost:5000/users', action.payload);
        // console.log(user)
        yield put(addUserEmail(user.data.email));
    } catch (error) {
        console.log(error);
    }
}

export function* userSaga() {
    yield takeLatest(addUserRequest, addUserSaga)
}