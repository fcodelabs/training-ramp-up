import { call, put, takeLatest } from "redux-saga/effects";
import { userActions } from "./userSlice";
import { api } from "../../api/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { userApi, userSignInApi, userSignOutApi } from "../../api/crudApi";

interface IData {
  id: number;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IUserData {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface ISignIn {
  email: string;
  password: string;
}

interface IUserResponse {
  data: {
    message: string;
    data: IUserData[];
  };
}

function* fetchUser() {
  try {
    const response: IUserResponse = yield call(api.get, userApi);
    yield put(userActions.setUserEntries(response.data.data));
  } catch (e) {
    alert("Error fetching user data " + e);
  }
}

function* addAndUpdateUser(action: PayloadAction<IData>) {
  const data = action.payload;

  const userData = {
    roleType: data.roleType,
    name: data.name,
    address: data.address,
    email: data.email,
    mobileNumber: data.mobileNumber,
    dob: data.dob,
    password: data.password,
    gender: data.gender,
  };

  const isUpdate: boolean = data.id !== -1;

  try {
    if (isUpdate) {
      yield call(api.put, `${userApi}/${data.email}`, userData);
    } else {
      yield call(api.post, userApi, userData);
    }
    yield put(userActions.fetchUser());
  } catch (e) {
    alert("Error adding/updating user data " + e);
  }
}

function* deleteUser(action: PayloadAction<string>) {
  try {
    const email = action.payload;
    yield call(api.delete, `${userApi}/${email}`);
    yield put(userActions.fetchUser());
  } catch (e) {
    alert("Error deleting user data " + e);
  }
}

function* signIn(action: PayloadAction<ISignIn>) {
  const { email, password } = action.payload;
  const userData = {
    email: email,
    password: password,
  };
  try {
    const response: AxiosResponse = yield call(api.post, userSignInApi, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      alert("Signed in successfully");
      yield put(userActions.setAuthenticated(true));
      yield put(userActions.setEmail(email));
    }
  } catch (e) {
    alert("Error signing in " + e);
  }
}

function* signOut() {
  try {
    yield call(api.delete, userSignOutApi, { withCredentials: true });
    yield put(userActions.setAuthenticated(false));
    yield put(userActions.setRoleType(""));
    yield put(userActions.setEmail(""));
  } catch (e) {
    alert("Error signing out " + e);
  }
}

function* setCurrentUser(action: PayloadAction<IUserData>) {
  const email = action.payload;
  try {
    const response: IUserResponse = yield call(api.get, `${userApi}/${email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(userActions.setRoleType(response.data.data[0].roleType));
  } catch (e) {
    alert("Error setting current user " + e);
  }
}

export function* userSaga() {
  yield takeLatest(userActions.fetchUser.type, fetchUser);
  yield takeLatest(userActions.saveAndUpdateUserEntry.type, addAndUpdateUser);
  yield takeLatest(userActions.deleteUserEntry.type, deleteUser);
  yield takeLatest(userActions.signIn.type, signIn);
  yield takeLatest(userActions.signOut.type, signOut);
  yield takeLatest(userActions.setCurrentUser.type, setCurrentUser);
}
