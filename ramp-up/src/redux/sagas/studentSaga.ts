import {call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { addStudentRequest, editStudentRequest, getStudentsRequest, storeStudents, deleteStudentRequest, removeStudent, addStudent } from '../slices/studentSlice';
import { IStudent, IEditStudentPayload } from '../slices/studentSlice';
import { AxiosResponse } from 'axios';


export interface INewStudent {
    name: string;
    age: number;
    gender: string;
    address: string;
    mobile: string;
    dob: Date | null;
  }

function* addStudentSaga(action: PayloadAction<INewStudent>) {
  try {
    const student = yield call(axios.post, 'http://localhost:5000/students', action.payload);
    yield put(addStudent(student.data));
  } catch (error) {
    console.log(error);
  }
}

function* getStudentsSaga() {
  try {
    const response: AxiosResponse<IStudent[]> = yield call(axios.get, 'http://localhost:5000/students');
    yield put(storeStudents(response.data)); 
  } catch (error) {
    console.log(error);
  }
}

function* editStudentSaga(action: PayloadAction<IEditStudentPayload>) {
  try {
    yield call(axios.patch, `http://localhost:5000/students/${action.payload.id}`, action.payload.student);
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudentSaga(action: PayloadAction<number>) {
  try {
    yield call(axios.delete, `http://localhost:5000/students/${action.payload}`);
    yield put(removeStudent(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* studentSaga() {
    yield takeLatest(addStudentRequest, addStudentSaga)
    yield takeEvery(getStudentsRequest, getStudentsSaga)
    yield takeLatest(editStudentRequest, editStudentSaga)
    yield takeLatest(deleteStudentRequest, deleteStudentSaga)
  }