import { put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { userActions } from "./slice";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  authUser,
  createUser,
  loadAllUsers,
  logIn,
  logOut,
  removeUser,
  updateUser,
} from "../../api/userApi";

interface IUserData {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  role: string;
}

function* saveAndUpdateUser(action: PayloadAction<IUserData>) {
  const { id, email, name, password, role } = action.payload;

  const user: IUser = {
    email: email,
    name: name,
    password: password,
    role: role,
  };

  const isUpdate: boolean = id != 1 && email != "" && name != "" && password != "";
  try {
    if (isUpdate) {
      yield updateUser(email, user);
    } else {
      yield createUser(user);
    }
    yield put(userActions.fetchUser());
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* getAllUsers() {
  try {
    const response: IUser[] = yield loadAllUsers();
    yield put(userActions.setUser(response));
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* deleteUser(action: PayloadAction<string>) {
  try {
    yield removeUser(action.payload);
    yield put(userActions.fetchUser());
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* signIn(action: PayloadAction<ISignInData>) {
  try {
    const res: string = yield logIn(action.payload);

    if (res === "Login Success") {
      yield authorizeUser();
    }
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* signOut() {
  try {
    yield logOut();
    yield put(userActions.setAuthenticated(false));
    yield put(userActions.setCurrentUserRole(""));
    yield put(userActions.setCurrentUsername(""));
  } catch (error) {
    toast("Something went wrong..!");
  }
}

function* authorizeUser() {
  try {
    const res: AxiosResponse = yield authUser();
    if (res.data.message === "Authorized") {
      yield put(userActions.setAuthenticated(true));
      yield put(userActions.setCurrentEmail(res.data.data.data.email));
      yield put(userActions.setCurrentUserRole(res.data.data.data.role));
    }
  } catch (error) {
    toast("You must sign in first..!");
  }
}

export function* userSaga() {
  yield takeEvery(userActions.fetchUser.type, getAllUsers);
  yield takeEvery(userActions.saveAndUpdateUser, saveAndUpdateUser);
  yield takeEvery(userActions.removeUser, deleteUser);
  yield takeEvery(userActions.signIn, signIn);
  yield takeEvery(userActions.signOut, signOut);
  yield takeEvery(userActions.authorizeUser, authorizeUser);
}
