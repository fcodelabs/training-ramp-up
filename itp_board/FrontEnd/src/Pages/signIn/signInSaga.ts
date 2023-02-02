import {put, takeEvery, all, call, take, cancelled} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    changeAdmin,
    changeEmail,
    changeFirstName,
    changeLastName,
    changeSignInUser,
    signInUser,
    signOutUser
} from "./signInSlice";
import {ResponseObj, User, UserCredetial, UserInitialState} from "../../utils/types";
import {checkCredentials} from "../../apis/userAPIs";
import {displayErrors} from "../../utils/toasts";

function* signOut(){
    yield put(changeFirstName(''));
    yield put(changeLastName(''));
    yield put(changeEmail(''));
    yield put(changeAdmin(false));
    yield put(changeSignInUser(false));
}
function* signIn(action:PayloadAction<UserCredetial>){
    let response:ResponseObj|null = null;
    const {navigate} = action.payload;
    try {
        response= yield call(checkCredentials,action.payload)
        if(response){
            const {data,authorized} = response;
            if(authorized){
                yield put(changeEmail(action.payload.email));
                yield put(changeFirstName(data.firstName));
                yield put(changeAdmin(data.admin));
                yield put(changeLastName(data.lastName));
                navigate('/students')
            }else{
                yield call(signOut);
                displayErrors(['Invalid Email or Password'])
            }
        }else{
            yield call(signOut);
            displayErrors(['Invalid Email or Password'])
            displayErrors(['Unknown Error']);
        }

    }catch (error){
        console.error(error);
        yield put(changeFirstName(''));
        yield put(changeLastName(''));
        yield put(changeEmail(''));
        yield put(changeSignInUser(false));
    }

}

export default function* signInSaga(){
    yield takeEvery(signInUser,signIn)
    yield takeEvery(signOutUser,signOut)
}
