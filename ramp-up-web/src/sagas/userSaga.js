import { all, call, takeLatest, put } from "redux-saga/effects";
import * as actions from "../reducer";
import { URL } from "../constants";

const getUser = (user) =>
  fetch(`${URL}/users/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((result) => result.json())
    .then((result) => result);

const addUser = (user) =>
  fetch(`${URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((result) => result.json())
    .then((result) => result);

const refreshUser = (userName) =>
  fetch(`${URL}/users/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userName),
  })
    .then((result) => result.json())
    .then((result) => result);

const signOutUser = (userName) =>
  fetch(`${URL}/users/signout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userName),
  })
    .then((result) => result.text())
    .then((result) => result);

function* workSignOutUser(userName) {
  const response = yield call(() => signOutUser(userName));
  if (response.error == null) {
    yield put(actions.addToken(null));
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  } else {
    alert(response.error);
  }
}

function* workRefreshUser(userName) {
  const response = yield call(() => refreshUser(userName));
  if (response.status === 200) {
    yield put(actions.addToken(response.token));
  } else {
    alert(response.token);
    yield put(actions.addToken(null));
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  }
}

function* workAddUser(user) {
  const response = yield call(() => addUser(user));
  if (response.error == null) {
    yield put(actions.addToken(response.token));
    localStorage.setItem("user", response.username);
    localStorage.setItem("role", response.role);
  } else {
    alert(response.error);
  }
}

function* workGetUser(user) {
  const response = yield call(() => getUser(user));
  if (response.error == null) {
    yield put(actions.addToken(response.token));
    localStorage.setItem("user", response.username);
    localStorage.setItem("role", response.role);
  } else {
    alert(response.error);
  }
}

function* addUserSaga() {
  yield takeLatest("addUser", workAddUser);
}

function* getUserSaga() {
  yield takeLatest("getUser", workGetUser);
}

function* refreshUserSaga() {
  yield takeLatest("refreshUser", workRefreshUser);
}

function* signOutUserSaga() {
  yield takeLatest("signOutUser", workSignOutUser);
}

export default function* userSaga() {
  yield all([
    addUserSaga(),
    getUserSaga(),
    refreshUserSaga(),
    signOutUserSaga(),
  ]);
}
