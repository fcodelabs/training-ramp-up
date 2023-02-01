import { put, takeEvery, all } from 'redux-saga/effects'
import {
  addStudent,
  addStudentSuccess,
  addStudentFailure,
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  updateStudent,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './gridSlice'
import api from '../../api'
import { toast } from 'react-toastify'
import { Student } from '../../utils/interfaces'
import { checkValid, age } from '../../utils/validators'

function* getStudentsSaga(): Generator<any, any, any> {
  try {
    const response = yield api.student.getStudents()
    const students: Student[] = response.data.data
    students.map((item: Student) => {
      item.dob = new Date(item.dob)
    })
    yield put(getStudentsSuccess(students))
  } catch (error) {
    yield put(getStudentsFailure())
  }
}

function* addStudentSaga(action: any): Generator<any, any, any> {
  const item: Student = action.payload
  if (checkValid(item)) {
    if (!item.gender) {
      item.gender = 'Male'
    }
    item.inEdit = false
    try {
      const response = yield api.student.postStudent(item)
      // toast.success('Successfully Added', {
      //   position: toast.POSITION.TOP_RIGHT,
      // })
      const addedStudent = response.data.data
      addedStudent.dob = new Date(addedStudent.dob)
      yield put(addStudentSuccess(addedStudent))
    } catch (error) {
      yield put(addStudentFailure())
      console.log(error)
    }
  }
}

function* updateStudentSaga(action: any): Generator<any, any, any> {
  const item: Student = action.payload
  const itemToUpdate = {
    id: item.id,
    name: item.name,
    gender: item.gender,
    dob: item.dob,
    address: item.address,
    mobile: item.mobile,
    age: age(item.dob),
  }
  try {
    const response = yield api.student.putStudent(itemToUpdate.id, itemToUpdate)
    toast.success('Successfully Updated', {
      position: toast.POSITION.TOP_RIGHT,
    })
    const updatedStudent = response.data.data
    updatedStudent.dob = new Date(updatedStudent.dob)
    yield put(updateStudentSuccess({ inEdit: false, ...updatedStudent }))
  } catch (error) {
    yield put(updateStudentFailure())
    console.log(error)
  }
}

function* deleteStudentSaga(action: any): Generator<any, any, any> {
  const item: Student = action.payload
  const itemToDelete = item.id
  try {
    yield api.student.deleteStudent(itemToDelete)
    // toast.success('Successfully Deleted', {
    //   position: toast.POSITION.TOP_RIGHT,
    // })
    yield put(deleteStudentSuccess(itemToDelete))
  } catch (error) {
    yield put(deleteStudentFailure())
    console.log(error)
  }
}

export default function* gridSaga() {
  yield all([
    takeEvery(getStudents, getStudentsSaga),
    takeEvery(addStudent, addStudentSaga),
    takeEvery(updateStudent, updateStudentSaga),
    takeEvery(deleteStudent, deleteStudentSaga),
  ])
}
