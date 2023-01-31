import {put, takeEvery, all, call, take, cancelled} from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    changeEmail,
    changeFirstName,
    changeLastName,
    changeSignInUser,
    signInUser,
    signUpUser
} from "../signIn/signInSlice";
import {User} from "../../utils/types";
import {createUserData} from "../../apis/userAPIs";
import {displayErrors} from "../../utils/toasts";



function* signUp(action:PayloadAction<User>){
    let response:User|null = null;
    try {
        response = yield call(createUserData,action.payload);
        const {navigate} = action.payload;
        if(response!==null){
            const {firstName,lastName,email} = response;
            yield put(changeFirstName(firstName));
            yield put(changeLastName(lastName));
            yield put(changeEmail(email));
            navigate('/students')
        }
    }
    catch (error) {
        console.error(error);
        yield put(changeFirstName(''));
        yield put(changeLastName(''));
        yield put(changeEmail(''));
        yield put(changeSignInUser(false));
        displayErrors(['Unexpected Error!!!'])
    }
}
export default function* signUpSaga(){
    yield takeEvery(signUpUser,signUp)
}