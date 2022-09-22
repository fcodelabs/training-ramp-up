import { signoutUser, signinStatus ,signupUser, signinUser } from '../requests';
import { call,put } from "redux-saga/effects";
import { setUser } from '../../slices';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function* handleGetUserStatus(): any{
    try{
        let res= yield call(signinStatus);
        if(res.status===200){
            res = cookies.get('userData');
            yield put(setUser({res,task:"GET_USER"}));
        }
    }catch(err){
        console.log(err);
    }
}

export function* handleLogInUser({payload}:any):any{
    try{
        let res = yield call(signinUser,payload);
        if(res.status === 200){
            res = cookies.get('userData');
            yield put(setUser({res,task:"LOGIN_USER"}));
        }
    }catch(err){
        console.log(err);
    }
}

export function* handleLogOutUser({payload}:any):any{
    try{
        let res = yield call(signoutUser,payload);
        if(res.status === 200){
            yield put(setUser({res,task:"LOGOUT_USER"}));
        }
    }catch(err){
        console.log(err);
    }
}

export function* handleSignUpUser({payload}:any):any{
    try{
        let res = yield call(signupUser,payload);
        console.log(res);
        if(res.status === 200){
            res = cookies.get('userData');
            yield put(setUser({res,task:"SIGNUP_USER"}));
        }
    }catch(err){
        console.log(err);
    }
}