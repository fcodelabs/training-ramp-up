import { call, put, takeEvery } from 'redux-saga/effects'
import { logIn, logInSuccess, signOut, signOutSuccess } from '../slice/SignInPageSlice'
import axios from '../../../axios'

function* handleLogIn(action: any): any {
    try {
        const res = yield call(() =>
            axios.get(
                'user/' +
                    action.payload.username +
                    '/' +
                    action.payload.password
            )
        )
        res.data.auth == true ? yield put(signOutSuccess()) : alert(res.data)
    } catch (error: any) {
        alert(error)
    }
}

function* handleSignOut(action: any): any {
    try {
        const res = yield call(() =>
            axios.delete(
                'user/'
            )
        )
        res.data.logOut == false ? yield put(logInSuccess(res.data)) : alert(res.data)
    } catch (error: any) {
        alert(error)
    }
}

export function* SignInPageSaga() {
    yield takeEvery(logIn, handleLogIn)
   
    yield takeEvery(signOut, handleSignOut)
}
