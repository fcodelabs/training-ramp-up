import { call, put, takeEvery } from "redux-saga/effects";

import userSlice from "../slice/userSlice";
import loginSlice from "../slice/loginSlice";
import { findUser, insertUser } from "../../utils/services";

function* userGetFun(payload) {
  //console.log("Payload", payload.payload.user);
  let res = yield call(findUser, payload.payload);
  console.log("Response", res.data);
  yield put(
    loginSlice.actions.saveToken({
      name: res.data.user.name,
      role: res.data.user.role,
      token: res.data.accessToken,
    }),
  );

  //console.log("Response", res);
}
function* userRegFun(payload) {
  console.log("Payload", payload);
  yield call(insertUser, payload);
}

export function* callUserGetFun() {
  yield takeEvery(userSlice.actions.logInUser, userGetFun);
  yield takeEvery(userSlice.actions.registerUser, userRegFun);
}
