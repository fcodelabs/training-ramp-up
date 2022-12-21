import { call, put, takeEvery } from 'redux-saga/effects'
import { logIn, logInSuccess } from '../slice/SignInPageSlice'
import axios from '../../../axios'


function* handleLogIn(action: any): any {

    try {
        const res = yield call(() =>
            axios.get('user/' + action.payload.username)
        )
        if (res.data != '') {
            action.payload.password == res.data.password
                ? yield put(logInSuccess(true))
                : alert('Incorrect Password')
        } else {
            alert('User not found')
        }
    } catch (error: any) {
        alert(error)
    }
}

export function* SignInPageSaga() {
    yield takeEvery(logIn, handleLogIn)
}
