import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { userActions } from "./slice";
import { AxiosResponse } from "axios";

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

interface IResponse {
  data: IUser[];
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
    yield call(isUpdate ? api.put : api.post, `/user/${isUpdate ? email : "add"}`, user, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    yield put(userActions.fetchUser());
  } catch (error) {
    alert(error);
  }
}

function* getAllUsers() {
  try {
    const response: IResponse = yield call(api.get, "/user");
    yield put(userActions.setUser(response.data));
  } catch (error) {
    alert(error);
  }
}

function* deleteUser(action: PayloadAction<string>) {
  const email = action.payload;

  try {
    yield call(api.delete, `/user/del/${email}`, {
      withCredentials: true,
    });
  } catch (error) {
    alert(error);
  }
}

function* signIn(action: PayloadAction<ISignInData>) {
  try {
    const res: AxiosResponse = yield call(api.post, "/user/signIn", action.payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (res.data.message == "Login Success") {
      yield authorizeUser();
    }
  } catch (error) {
    alert(error);
  }
}

function* signOut() {
  try {
    yield call(api.delete, "/user/signOut", {
      withCredentials: true,
    });
    yield put(userActions.setAuthenticated(false));
    yield put(userActions.setCurrentUserRole(""));
    yield put(userActions.setCurrentUsername(""));
  } catch (error) {
    alert(error);
  }
}

function* authorizeUser() {
  try {
    const res: AxiosResponse = yield call(api.post, "/auth/authorize", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (res.data.message == "Authorized") {
      yield put(userActions.setAuthenticated(true));
      yield put(userActions.setCurrentEmail(res.data.data.data.email));
      yield put(userActions.setCurrentUserRole(res.data.data.data.role));
    }
  } catch (error) {
    alert("You must sign in first..!");
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
