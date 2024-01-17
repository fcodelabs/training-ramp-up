import { takeLatest, put, call } from 'redux-saga/effects'
import { setUsers, fetchUsers, fetchUsersFailure } from './userSlice'
import { User } from '../../types'

const fetchStudentsAsync = async () => {
    const response = await fetch('http://localhost:3000/students')
    const data = await response.json()
    return data
}

function* fetchStudents() {
    try {
        const students: User[] = yield call(fetchStudentsAsync)
        yield put(setUsers(students))
    } catch (error: any) {
        yield put(fetchUsersFailure(error))
    }
}

export function* fetchStudentsStart() {
    yield takeLatest(fetchUsers, fetchStudents)
}

// saga for data post
