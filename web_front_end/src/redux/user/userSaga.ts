import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    getUserDataApi,
    signInUserDataApi,
    deleteUserDataApi,
    addedUserDataApi,
    updateUserDataApi,
    signOutDataApi,
    getRoleTypeDataApi,
} from "../../api/api";
import { userDataActions } from "./userSlice";
import { AxiosResponse } from "axios";

// Define data types
interface IUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

interface IUserData {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

interface ISignInData {
    userEmail: string;
    userPassword: string;
}

// Define response types
interface IResponseData {
    data: {
        data: IUser[];
    };
}

// Define action types
const {
    fetchUsersData,
    removeUserData,
    updateUserData,
    setUserData,
    signInUserData,
    setCurrentUserRoleData,
    setIsAuthenticatedData,
    setCurrentUserEmailData,
    setCurrentUser,
    signOutData,
} = userDataActions;

// Define saga functions
function* getAllUserDataRows() {
    try {
        const response: IResponseData = yield call(getUserDataApi);
        console.log(response.data.data);
        yield put(setUserData(response.data.data));
    } catch (e) {
        console.log("Loading data failed. Please try again." + e);
    }
}

function* updateUserDataRow(action: PayloadAction<IUserData>) {
    const data = action.payload;
    const isUpdate: boolean = data.userId !== -1;

    const userData: IUser = {
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        role: data.role,
    };

    try {
        if (isUpdate) {
            yield call(updateUserDataApi, data.userEmail, userData);
        } else {
            yield call(addedUserDataApi, userData);
        }

        yield call(getAllUserDataRows);
    } catch (e) {
        console.log("Saving or Updating data failed. Please try again." + e);
    }
}

function* deleteUserDataRow(action: PayloadAction<string>) {
    const userEmail = action.payload;
    try {
        if (userEmail) {
            yield call(deleteUserDataApi, userEmail);
            yield call(getAllUserDataRows);
        }
    } catch (e) {
        console.log("Deleting data failed. Please try again." + e);
    }
}

function* signInUserDataRow(action: PayloadAction<ISignInData>) {
    const data = action.payload;
    const signInData: ISignInData = {
        userEmail: data.userEmail,
        userPassword: data.userPassword,
    };

    try {
        const res: AxiosResponse = yield call(signInUserDataApi, signInData);
        if (res.data.message == "Sign in Successfully") {
            alert("Sign in Successfully");
            yield put(setIsAuthenticatedData(true));
            yield put(setCurrentUserEmailData(data.userEmail));
        }
    } catch (e) {
        alert("Signing in failed. Please try again.");
    }
}

function* signOut() {
    try {
        const res: AxiosResponse = yield call(signOutDataApi);
        if (res.data.message == "Sign out successfully") {
            yield put(setIsAuthenticatedData(false));
            yield put(setCurrentUserRoleData(""));
            yield put(setCurrentUserEmailData(""));
        }
    } catch (e) {
        console.log("Signing out failed. Please try again.");
    }
}

function* getRoleData(action: PayloadAction<string>) {
    try {
        const res: AxiosResponse = yield call(getRoleTypeDataApi, action.payload);
        if (res.status == 200 || res.status == 201) {
            yield put(setCurrentUserRoleData(res.data.data.role));
        }
    } catch (e) {
        console.log("Signing out failed. Please try again.");
    }
}

function* tableUserSaga() {
    yield takeEvery(fetchUsersData, getAllUserDataRows);
    yield takeEvery(updateUserData, updateUserDataRow);
    yield takeEvery(removeUserData, deleteUserDataRow);
    yield takeEvery(signInUserData, signInUserDataRow);
    yield takeEvery(setCurrentUser, getRoleData);
    yield takeEvery(signOutData, signOut);
}

function* userSaga() {
    yield all([tableUserSaga()]);
}

export default userSaga;
