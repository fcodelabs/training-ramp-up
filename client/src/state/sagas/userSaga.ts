import axios, { AxiosResponse } from "axios";
import { call,put } from "redux-saga/effects";
import { setUser,unsetUser } from '../slices';
import Cookies from 'universal-cookie';
import { LogInDataInputType, SignUpDataInputType } from "../../interfaces";

const cookies = new Cookies();

function signoutUser(sessionId:string){
    const res = axios.delete(`http://localhost:8000/user/logout/${sessionId}`,{
        withCredentials: true,
      });
    return res;
}

export function* handleLogOutUser({payload}:{payload:{sessionId:string}}){
    try{
        let data: AxiosResponse = yield call(signoutUser,payload.sessionId);
        if(data.status === 200){
            yield put(unsetUser);
        }
    }catch(err){
       alert(err);
    }
}


function signinUser(data:any){
    const res = axios.post("http://localhost:8000/user/login",data,{
        withCredentials: true,
      });
    return res;
}

export function* handleLogInUser({payload}:{payload:LogInDataInputType}){
    try{
        let data: AxiosResponse = yield call(signinUser,payload);
        data = cookies.get('userData');
        yield put(setUser(data));
    }catch(err){
        alert(err);
    }
}


function signupUser(data: any){
    const res = axios.post("http://localhost:8000/user/register",data,{
        withCredentials: true,
      });
    return res;
}

export function* handleSignUpUser({payload}:{payload:SignUpDataInputType}){
    try{
        let data: AxiosResponse = yield call(signupUser,payload);
        if(data.status === 200){
            data = cookies.get('userData');
            yield put(setUser(data));
        }
    }catch(err){
       alert(err);
    }
}


function signinStatus(){
    const res = axios.get("http://localhost:8000/user/status",{
        withCredentials:true
    });

    return res;
}

export function* handleGetUserStatus(){
    try{
        let data: AxiosResponse = yield call(signinStatus);
        if(data.status===200){
            data = cookies.get('userData');
            yield put(setUser(data));
        }
    }catch(err){
        console.log(err);
    }
}



