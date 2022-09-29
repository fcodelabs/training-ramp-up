import io from "socket.io-client";
import { takeLatest, all, put, call, select } from "redux-saga/effects";
import * as actions from "../reducer";
import { URL } from "../constants";
import { startEdit } from "../utils/functions";

const getStudents = (token) =>
  fetch(`${URL}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
  })
    .then((res) => res.json())
    .then((result) => result);

function* workGetStudents(props) {
  const { changingEntry, token } = yield select();
  const { notify, id } = props.payload;
  const response = yield call(() => getStudents(token));
  let sortedEntries = response.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));
  if (notify && changingEntry !== null) {
    if (id === undefined) {
      if (changingEntry.new) {
        sortedEntries.unshift(changingEntry);
        yield put(actions.addEntries(sortedEntries));
      } else {
        yield put(actions.addEntries(sortedEntries));
        yield put(actions.addUpdatingEntry(null));
        startEdit(changingEntry);
      }
    } else if (id === changingEntry.ID) {
      yield put(actions.addEntries(sortedEntries));
      yield put(actions.addUpdatingEntry(null));
      yield put(actions.addChangingEntry(null));
    } else {
      if (changingEntry.new) {
        sortedEntries.unshift(changingEntry);
        yield put(actions.addEntries(sortedEntries));
      } else {
        yield put(actions.addEntries(sortedEntries));
        yield put(actions.addUpdatingEntry(null));
        startEdit(changingEntry);
      }
    }
  } else {
    yield put(actions.addEntries(sortedEntries));
  }
}

const addStudent = (student, token) =>
  fetch(`${URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: JSON.stringify(student),
  }).then((result) => result.text());

function* workAddStudent(entry) {
  const { token } = yield select();
  const insertingEntry = { ...entry.payload };
  const socket = io.connect(URL);
  delete insertingEntry.inEdit;
  delete insertingEntry.new;
  yield put(actions.addUpdatingEntry(null));
  yield put(actions.addChangingEntry(null));
  const response = yield call(() => addStudent(insertingEntry, token));
  socket.emit("student_added", response);
}

const updateStudent = (student, token) =>
  fetch(`${URL}/students/${student.ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: JSON.stringify(student),
  }).then((result) => result.text());

function* workUpdateStudent(entry) {
  const { token } = yield select();
  let updatedEntry = { ...entry.payload };
  const socket = io.connect(URL);
  delete updatedEntry.inEdit;
  yield put(actions.addUpdatingEntry(null));
  yield put(actions.addChangingEntry(null));
  const response = yield call(() => updateStudent(updatedEntry, token));
  socket.emit("student_edit", [response, updatedEntry.ID]);
}

const deleteStudent = (ID, token) =>
  fetch(`${URL}/students/${ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
  }).then((result) => result.text());

function* workDeleteStudent(entry) {
  const { token } = yield select();
  const socket = io.connect(URL);
  const response = yield call(() => deleteStudent(entry.payload.ID, token));
  socket.emit("student_remove", [response, entry.payload.ID]);
}

function* getStudentsSaga() {
  yield takeLatest("getStudents", workGetStudents);
}

function* addStudentSaga() {
  yield takeLatest("addStudent", workAddStudent);
}

function* updateStudentSaga() {
  yield takeLatest("updateStudent", workUpdateStudent);
}

function* deleteStudentSaga() {
  yield takeLatest("deleteStudent", workDeleteStudent);
}

function* studentSaga() {
  yield all([
    addStudentSaga(),
    getStudentsSaga(),
    updateStudentSaga(),
    deleteStudentSaga(),
  ]);
}

export default studentSaga;
