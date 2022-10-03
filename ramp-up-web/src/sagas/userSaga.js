import { all, call, takeLatest, put } from "redux-saga/effects";
import * as actions from "../reducer";
import { URL } from "../constants";

const getUser = (user) =>
  fetch(`${URL}/user/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((result) => result.json())
    .then((result) => result);

const addUser = (user) =>
  fetch(`${URL}/user/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((result) => result.json())
    .then((result) => result);

const refreshUser = (userName) =>
  fetch(`${URL}/user/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userName),
  })
    .then((result) => result.text())
    .then((result) => result);

const signOutUser = (userName) =>
  fetch(`${URL}/user/signout`, {
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
  if (response !== "Error signing out user") {
    yield put(actions.addToken(null));
    localStorage.removeItem("user");
  } else {
    alert(response);
  }
}

function* workRefreshUser(userName) {
  const response = yield call(() => refreshUser(userName));
  if (response !== "Invalid Token") {
    yield put(actions.addToken(response));
  } else {
    yield put(actions.addToken(null));
    localStorage.removeItem("user");
  }
}

function* workAddUser(user) {
  const response = yield call(() => addUser(user));
  if (response.error == null) {
    yield put(actions.addToken(response.token));
    localStorage.setItem("user", response.username);
  } else {
    alert(response.error);
  }
}

function* workGetUser(user) {
  const response = yield call(() => getUser(user));
  if (response.error == null) {
    yield put(actions.addToken(response.token));
    localStorage.setItem("user", response.username);
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
