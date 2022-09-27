import { call,put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as sliceActions from "../slices";
import { StudentDataType } from "../../interfaces";


function getStudents(){
    const res = axios.get("http://localhost:8000/student",{
        withCredentials: true,
      });
    return res;
}
export function* handleGetStudents(){
    try{
        let { data }: AxiosResponse = yield call(getStudents);
        yield put(sliceActions.initStudents(data.students));
    }catch(err){
        console.log(err);
    }
}

function addStudent(data:StudentDataType){
    const res = axios.post("http://localhost:8000/student",data,{
        withCredentials: true,
      });
    return res;
}  

export function* handleAddStudent({payload}:{payload:StudentDataType}){
    try{
        const {data}: AxiosResponse  = yield call(addStudent,payload);
        yield put(sliceActions.setNewStudent(data.student));
    }catch(err){
        alert(err);
    }
}


function updateStudent(data:StudentDataType){
    const res = axios.put(`http://localhost:8000/student/${data.id}`,data,{
        withCredentials: true,
      });
    return res;
}

export function* handleUpdateStudent({payload}:{payload:StudentDataType}){
    try{
        const {data}: AxiosResponse  = yield call(updateStudent,payload);
        delete data.updatedStudent.inEdit;
        yield put(sliceActions.setUpdatedStudent(data.updatedStudent));
    }catch(err){
        alert(err);
    }
}


export function deleteStudent(id:number){
    const res = axios.delete(`http://localhost:8000/student/${id}`,{
        withCredentials: true,
      });
    return res;
}

export function* handleDeleteStudent({payload}:{payload:{id:number}}){
    try{
        const {data}: AxiosResponse  = yield call(deleteStudent,payload.id);
        yield put(sliceActions.setRemainingStudents(data.id));
    }catch(err){
        alert(err);
    }
}

