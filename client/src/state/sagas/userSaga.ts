import axios from "axios";
import { call,put } from "redux-saga/effects";
import { setUser } from '../slices';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function signoutUser({sessionId}:any){
    const res = axios.delete(`http://localhost:8000/user/logout/${sessionId}`,{
        withCredentials: true,
      });
    return res;
}

export function* handleLogOutUser({payload}:any):any{
    try{
        let res = yield call(signoutUser,payload);
        if(res.status === 200){
            yield put(setUser({res,task:"LOGOUT_USER"}));
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

export function* handleLogInUser({payload}:any):any{
    try{
        let res = yield call(signinUser,payload);
        res = cookies.get('userData');
        yield put(setUser({res,task:"LOGIN_USER"}));
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

export function* handleSignUpUser({payload}:any):any{
    try{
        let res = yield call(signupUser,payload);
        if(res.status === 200){
            res = cookies.get('userData');
            yield put(setUser({res,task:"SIGNUP_USER"}));
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

export function* handleGetUserStatus():any{
    try{
        let res = yield call(signinStatus);
        if(res.status===200){
            res = cookies.get('userData');
            yield put(setUser({res,task:"GET_USER"}));
        }
    }catch(err){
        console.log(err);
    }
}



