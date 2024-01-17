import { takeLatest, put, call } from 'redux-saga/effects'
import { setUsers, fetchUsers, fetchUsersFailure } from './userSlice'
import { User } from '../../types'
import { GridValidRowModel } from '@mui/x-data-grid'

const fetchStudentsAsync = async () => {
    const response = await fetch('http://localhost:3000/students')
    const data = await response.json()
    console.log(data)
    return data
}

function* fetchStudents() {
    try {
        const students: GridValidRowModel[] = yield call(fetchStudentsAsync)
        yield put(setUsers(students))
    } catch (error: any) {
        yield put(fetchUsersFailure(error))
    }
}

export function* userSaga() {
    yield takeLatest(fetchUsers, fetchStudents)
}

// saga for data post
