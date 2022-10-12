import { call, put, takeEvery } from "redux-saga/effects";

import userSlice from "../slice/userSlice";
import loginSlice from "../slice/loginSlice";
import { findUser, insertUser } from "../../utils/userService";

function* callUserGetFun(payload) {
  let res = yield call(findUser, payload.payload);

  console.log("user login", res);
  localStorage.setItem("name", res.data.user.name);
  localStorage.setItem("role", res.data.user.role);
  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("id", res.data.user.id);

  yield put(
    loginSlice.actions.saveToken({
      name: res.data.user.name,
      role: res.data.user.role,
      token: res.data.accessToken,
      // refToken: res.data.user.refeshToken,
    }),
  );
  alert("User Login success");

  payload.payload.navigate("/datatable");
}
function* callUserRegFun(payload) {
  yield call(insertUser, payload);
  alert("User Register Success");
  payload.payload.navigate("/");
}

export function* callUserFun() {
  yield takeEvery(userSlice.actions.logInUser, callUserGetFun);
  yield takeEvery(userSlice.actions.registerUser, callUserRegFun);
}
