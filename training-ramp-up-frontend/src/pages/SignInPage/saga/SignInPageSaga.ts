import { call, put, takeEvery } from 'redux-saga/effects'
import {
    logIn,
    logInSuccess,
    signOut,
    signOutSuccess,
} from '../slice/SignInPageSlice'
import axios from 'axios'
import axiosInstance from '../../../utils/authorization'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { User } from '../../../utils/interfaces'

const cookies = new Cookies()

function* handleLogIn(action: {payload:{user:User,navigate:NavigateFunction}}): any {
    try {
        const res = yield call(() =>
            axios.post(
                'http://localhost:4000/user/',
                {
                    username: action.payload.user.username,

                    password: action.payload.user.password,
                },
                { withCredentials: true }
            )
        )

        if (res.data.auth) {
            const user = yield call(() =>
                axios.post('http://localhost:4000/user/userDetails','', {
                    withCredentials: true,
                })
            )
            

            yield put(logInSuccess(user))
            action.payload.navigate('/home')
        } else {
            alert('er' + res.data)
        }
    } catch (error: any) {
        alert('ERR' + error)
    }
}

function* handleSignOut(action: {payload:{navigate:NavigateFunction}}): any {
    try {
        const res = yield call(() =>
            axiosInstance.delete('user/', {
                withCredentials: true,
            })
        )
        const singedUser = cookies.get('user')
        if (!singedUser) {
            yield put(signOutSuccess())
            action.payload.navigate('/')
        } else {
            alert(res.data)
        }
    } catch (error: any) {
        alert('' + error)
    }
}

export function* SignInPageSaga() {
    yield takeEvery(logIn, handleLogIn)

    yield takeEvery(signOut, handleSignOut)
}
