import io from "socket.io-client";
import { takeLatest, all, put, call, select } from "redux-saga/effects";
import * as actions from "./reducer";
import { URL } from "./constants";
import { startEdit } from "./views/Students/utils/functions";

const getStudents = () =>
  fetch(`${URL}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result);

function* workGetStudents(props) {
  const { notify, id } = props.payload;
  const response = yield call(getStudents);
  let sortedEntries = response.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));
  const { changingEntry } = yield select();
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

const addStudent = (student) =>
  fetch(`${URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((result) => result.text());

function* workAddStudent(entry) {
  const insertingEntry = { ...entry.payload };
  const socket = io.connect(URL);
  delete insertingEntry.inEdit;
  delete insertingEntry.new;
  yield put(actions.addUpdatingEntry(null));
  yield put(actions.addChangingEntry(null));
  const response = yield call(() => addStudent(insertingEntry));
  socket.emit("student_added", response);
}

const updateStudent = (student) =>
  fetch(`${URL}/students/${student.ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((result) => result.text());

function* workUpdateStudent(entry) {
  let updatedEntry = { ...entry.payload };
  const socket = io.connect(URL);
  delete updatedEntry.inEdit;
  yield put(actions.addUpdatingEntry(null));
  yield put(actions.addChangingEntry(null));
  const response = yield call(() => updateStudent(updatedEntry));
  socket.emit("student_edit", [response, updatedEntry.ID]);
}

const deleteStudent = (ID) =>
  fetch(`${URL}/students/${ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.text());

function* workDeleteStudent(entry) {
  const socket = io.connect(URL);
  const response = yield call(() => deleteStudent(entry.payload.ID));
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

function* rootSaga() {
  yield all([
    addStudentSaga(),
    getStudentsSaga(),
    updateStudentSaga(),
    deleteStudentSaga(),
  ]);
}

export default rootSaga;
