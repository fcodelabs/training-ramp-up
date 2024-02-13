import {call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { addStudentRequest, editStudentRequest, getStudentsRequest, storeStudents, deleteStudentRequest, removeStudent, addStudent } from '../slices/studentSlice';
import { IStudent, IEditStudentPayload } from '../slices/studentSlice';
import { backendURL } from '../../constants';
import { AxiosResponse } from 'axios';


export interface INewStudent {
    name: string;
    age: number;
    gender: string;
    address: string;
    mobile: string;
    dob: Date | null;
  }

function* addStudentSaga(action: PayloadAction<IStudent>) {
  try {
const student = yield call(axios.post, `${backendURL}/students`, action.payload, {withCredentials: true});
    yield put(addStudent(student.data));
  } catch (error) {
    console.log(error);
  }
}

function* getStudentsSaga() {
  try {
    const response: AxiosResponse<IStudent[]> = yield call(axios.get, `${backendURL}/students`, {withCredentials: true});
    yield put(storeStudents(response.data)); 
  } catch (error) {
    console.log(error);
  }
}

function* editStudentSaga(action: PayloadAction<IEditStudentPayload>) {
  try {
    yield call(axios.patch, `${backendURL}/students/${action.payload.id}`, action.payload.student, {withCredentials: true});
  } catch (error) {
    console.log(error);
  }
}

function* deleteStudentSaga(action: PayloadAction<number>) {
  try {
    yield call(axios.delete, `${backendURL}/students/${action.payload}`, {withCredentials: true});
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