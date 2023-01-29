import {put, takeEvery, all, call, take, cancelled} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {Student, Person, SockeResponse} from "../../utils/types";
import {
    addNew,
    changeEditId,
    changeNewAdded,
    editData,
    startGetData,
    startDataEditing,
    successGetData,
    successAddNew,
    startAddNew,
    startRemove,
    successRemove
} from "./studentSlice";
import {isMutationDefinition} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {createData, deleteData, fetchData, updateData} from '../../utils/databaseInteractions2'
import {getStoreData} from "../../utils/studentFunctions";
import {displayErrors} from "../../utils/toasts";

import { io,Socket } from 'socket.io-client'
import { eventChannel, EventChannel } from 'redux-saga'
const socket = io('http://localhost:4000')



function* get(){
    try {
        const data:Student[] = yield call(fetchData);
        yield put(editData(data));
        yield put(successGetData());

    } catch (error:any) {
        console.error(error)
        yield put(editData([]));
    }
}

function* create(action:PayloadAction<Student>){
    const record = action.payload
    try {
        const response:Student = yield call(createData,record);
        if(response!==null){
            yield put(changeEditId(null));
            yield put(changeNewAdded(false));
            yield put(successAddNew());

        }
    }catch (error) {
        console.error(error);
        displayErrors(['Unexpected error']);
    }
}

function* update(action:PayloadAction<Student>){
    const record = action.payload
    try {
        const response:Student = yield call(updateData,record);
        if(response!==null){
            yield put(changeEditId(null));
            yield put(changeNewAdded(false));
        }
    }catch (error){
        console.error(error);
        displayErrors(['Unexpected error'])
    }
}

type Res = {
    raw:any[];
    affected:1;
}
function* remove(action:PayloadAction<number>){
    const response:Res = yield call(deleteData,action.payload);
    if(response!==null){
        yield put(successRemove())
    }
}

export default function* studentSaga (){
    yield takeEvery(startGetData, get);
    yield takeEvery(startAddNew,create);
    yield takeEvery(startDataEditing,update);
    yield takeEvery(startRemove,remove);
}