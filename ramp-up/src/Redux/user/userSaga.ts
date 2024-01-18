import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { setUsers, fetchUsers, fetchUsersFailure, addUser,setUserError, discardUser } from "./userSlice";
import { GridValidRowModel } from "@mui/x-data-grid";
const url = process.env.REACT_APP_API_URL;

const fetchUsersAsync = async () => {
  const response = await fetch(`${url}/students`);
  const data = await response.json();
  return data;
};

const addUsersAsync = async (user: GridValidRowModel) => {
  const response = await fetch(`${url}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  const data = await response.json();
  return data;
};

const deleteUserAsync = async (id: number) => {
  const response = await fetch(`${url}/students/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

function* fetchStudents() {
  try {
    const students: GridValidRowModel[] = yield call(fetchUsersAsync);
    yield put(setUsers(students));
  } catch (error: any) {
    yield put(fetchUsersFailure(error));
  }
}

function* addNewUser(action: any) {
  try {
    const student: GridValidRowModel = yield call(
      addUsersAsync,
      action.payload
    );
    yield put(addUser(student));
  } catch (error: any) {
    put(setUserError(action.payload.id));
    return error;
  }
}

function* deleteUser(action: any) {
  try {
    yield call(deleteUserAsync, action.payload);
  } catch (error: any) {
    return error;
  }
}


export function* userSaga() {
  yield takeLatest(fetchUsers, fetchStudents);
  yield takeLeading(addUser, addNewUser);
  yield takeLeading(discardUser, deleteUser);
}

