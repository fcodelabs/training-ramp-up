import { call, put, takeEvery } from 'redux-saga/effects'
import {
    getStudents,
    setStudents,
    getStudentsFailed,
    addStudent,
    addStudentFailed,
    deleteStudent,
    deleteStudentFailed,
    updateStudent,
    updateStudentFailed,
} from '../slice/HomePageSlice'
import axios from '../../../utils/authorization'
import { Person } from '../../../utils/interfaces'

function* handleGetStudents(): any {
    try {
        const res = yield call(() =>
            axios.get('student', {
                withCredentials: true,
            })
        )
        const students: Person[] = res.data.map((temp: Person) => ({
            inEdit: false,
            ...temp,
        }))
        yield put(setStudents(students))
    } catch (error: any) {
        yield put(getStudentsFailed(error))
    }
}

function* handleAddStudent(action: any): any {
    try {
        const res = yield call(() =>
            axios.post('student', action.payload, {
                withCredentials: true,
            })
        )
        yield put(getStudents())
    } catch (error: any) {
        yield put(addStudentFailed(error))
    }
}

function* handleDeleteStudent(action: any): any {
    try {
        const res = yield call(() =>
            axios.delete('student/' + action.payload, {
                withCredentials: true,
            })
        )
        yield put(getStudents())
    } catch (error: any) {
        yield put(deleteStudentFailed(error))
    }
}

function* handleUpdateStudent(action: any): any {
    try {
        const res = yield call(() =>
            axios.patch('student', action.payload, {
                withCredentials: true,
            })
        )
        yield put(getStudents())
    } catch (error: any) {
        yield put(updateStudentFailed(error))
    }
}

export function* HomePageSaga() {
    yield takeEvery(getStudents, handleGetStudents)
    yield takeEvery(addStudent, handleAddStudent)
    yield takeEvery(deleteStudent, handleDeleteStudent)
    yield takeEvery(updateStudent, handleUpdateStudent)
}
