import { call,put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import * as sliceActions from "../slices";
import { StudentDataType } from "../../interfaces";

function refreshAccessToken(){
    const res = axios.post('http://localhost:8000/user/refresh',{},{withCredentials:true});
    return res;
}


function getStudents(){
    const res = axios.get("http://localhost:8000/student/getStudents",{
        withCredentials: true,
      });
    return res;
}
export function* handleGetStudents(){
    try{
        let  result : AxiosResponse = yield call(getStudents);
        if(result.status === 200){
            yield put(sliceActions.initStudents(result.data.students));
        }
    }catch(err){
        let reAuthorize: AxiosResponse = yield call(refreshAccessToken); 
        if(reAuthorize.status === 200){
            let result: AxiosResponse = yield call(getStudents);
            yield put(sliceActions.initStudents(result.data.students));
        }else {
            console.log("Unauthorized!");
        }
    }
}

function addStudent(data:StudentDataType){
    const res = axios.post("http://localhost:8000/student/addStudent",data,{
        withCredentials: true,
      });
    return res;
}  

export function* handleAddStudent({payload}:{payload:StudentDataType}){
    try{
        let result: AxiosResponse  = yield call(addStudent,payload);
        yield put(sliceActions.setNewStudent(result.data.student));
    }catch(err){
        let reAuthorize: AxiosResponse = yield call(refreshAccessToken); 
        if(reAuthorize.status === 200){
            let result: AxiosResponse  = yield call(addStudent,payload);
            yield put(sliceActions.setNewStudent(result.data.student));
        }else{
            alert(err);
        }
    }
}


function updateStudent(data:StudentDataType){
    const res = axios.put(`http://localhost:8000/student/updateStudent`,data,{
        withCredentials: true,
      });
    return res;
}

export function* handleUpdateStudent({payload}:{payload:StudentDataType}){
    try{
        let result: AxiosResponse  = yield call(updateStudent,payload);
        if(result.status === 200){
            delete result.data.student.inEdit;
            yield put(sliceActions.setUpdatedStudent(result.data.student));
        }
    }catch(err){
        let reAuthorize: AxiosResponse = yield call(refreshAccessToken); 
        if(reAuthorize.status === 200){
            let result: AxiosResponse = yield call(updateStudent,payload);
            delete result.data.student.inEdit;
            yield put(sliceActions.setUpdatedStudent(result.data.student));
        }else{
            alert(err);
        }
    }
}


export function deleteStudent(id:number){
    const res = axios.delete(`http://localhost:8000/student/deleteStudent/${id}`,{
        withCredentials: true,
      });
    return res;
}

export function* handleDeleteStudent({payload}:{payload:{id:number}}){
    try{
        let result: AxiosResponse  = yield call(deleteStudent,payload.id);
        if(result.status === 200){
            yield put(sliceActions.setRemainingStudents(payload.id));
        }
    }catch(err){
        let reAuthorize: AxiosResponse = yield call(refreshAccessToken); 
        if(reAuthorize.status === 200){
            let result: AxiosResponse = yield call(deleteStudent,payload.id);
            yield put(sliceActions.setRemainingStudents(result.data.student.id));
        }else{
            alert(err);
        }
    }
}

