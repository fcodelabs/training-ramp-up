import {put, takeEvery, all, call, take, cancelled} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {changeAdmin, changeEmail, changeFirstName, changeLastName, signInUser_} from "./signInSlice";
import {UserInitialState} from "../../utils/types";


function* signIn(action:PayloadAction<UserInitialState>){
    console.log(action.payload);
    yield put(changeEmail(action.payload.email));
    yield put(changeFirstName(action.payload.firstName));
    yield put(changeAdmin(action.payload.admin));
    yield put(changeLastName(action.payload.lastName));
}

export default function* signInSaga(){
    yield takeEvery(signInUser_,signIn)
}