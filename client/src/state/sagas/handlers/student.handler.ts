import { addStudent, deleteStudent ,updateStudent, getStudents } from '../requests';
import { call,put } from "redux-saga/effects";
import { setStudents } from '../../slices';

export function* handleGetStudents(): any{
    try{
        let res= yield call(getStudents);
        if(res.status===200){
            yield put(setStudents({res,do:"GET_STUDENTS"}));
        }
    }catch(err){
        console.log(err);
    }
}

export function* handleAddStudent({payload}:any):any{
    try{
        const res = yield call(addStudent,payload);
        yield put(setStudents({res,do:"ADD_STUDENT"}));
    }catch(err){
        console.log(err);
    }
}

export function* handleDeleteStudent({payload}:any):any{
    try{
        const res = yield call(deleteStudent,payload);
        yield put(setStudents({res,do:"REMOVE_STUDENT"}));
    }catch(err){
        console.log(err);
    }
}

export function* handleUpdateStudent({payload}:any):any{
    try{
        const res = yield call(updateStudent,payload.dataItem);
        yield put(setStudents({res,do:"UPDATE_STUDENT"}));
    }catch(err){
        console.log(err);
    }
}