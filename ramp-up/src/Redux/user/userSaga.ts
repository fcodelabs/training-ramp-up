import { takeLatest, put, call } from 'redux-saga/effects'
import { setUsers, fetchUsers, fetchUsersFailure } from './userSlice'
import { GridValidRowModel } from '@mui/x-data-grid'
const url = process.env.REACT_APP_API_URL

const fetchStudentsAsync = async () => {
    const response = await fetch(`${url}/students`)
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
