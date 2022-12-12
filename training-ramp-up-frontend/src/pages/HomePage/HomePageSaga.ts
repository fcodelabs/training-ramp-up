import { call, put, takeEvery } from 'redux-saga/effects'
import {
    getStudents,
    setStudents,
    getStudentsFailed,
    addStudent,
    addStudentSuccess,
    deleteStudent,
    updateStudent,
} from './HomePageSlice'
import axios from '../../axios'
import { log } from 'console'
import { Person } from '../../utils/interfaces'
import { DateTimePicker } from '@progress/kendo-react-dateinputs'

function* handleGetStudents(): any {
    try {
        const res = yield call(() => axios.get('student'))
        const students:Person[] =res.data.map((temp:Person) => ({
            inEdit: false,
            ...temp,
        }));
        yield put(setStudents(students))
    } catch (error: any) {
        yield put(getStudentsFailed(error))
    }
}

function* handleAddStudent(action: any): any {
    try {
        const res = yield call(() => axios.post('student', action.payload))
        yield put(addStudentSuccess(res.data))
    } catch (error: any) {
        //yield put(getStudentsFailed(error))
    }
}

function* handleDeleteStudent(action: any): any {
    try {
        const res = yield call(() => axios.delete('student/'+ action.payload))
        yield put(getStudents())
    } catch (error: any) {
        //yield put(getStudentsFailed(error))
    }
}

function* handleUpdateStudent(action: any): any {
    try {
        const res = yield call(() => axios.put('student', action.payload))
        yield put(getStudents())
    } catch (error: any) {
        //yield put(getStudentsFailed(error))
    }
}

export function* HomePageSaga() {
    yield takeEvery(getStudents, handleGetStudents)
    yield takeEvery(addStudent, handleAddStudent)
    yield takeEvery(deleteStudent, handleDeleteStudent)
    yield takeEvery(updateStudent, handleUpdateStudent)
}
