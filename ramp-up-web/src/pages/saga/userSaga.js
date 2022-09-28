import { call, put, takeEvery } from "redux-saga/effects";

import userSlice from "../slice/userSlice";
import loginSlice from "../slice/loginSlice";
import { findUser, insertUser } from "../../utils/services";

function* callUserGetFun(payload) {
  let res = yield call(findUser, payload.payload);
  console.log("Response", res.data);
  yield put(
    loginSlice.actions.saveToken({
      name: res.data.user.name,
      role: res.data.user.role,
      token: res.data.accessToken,
    }),
  );
}
function* callUserRegFun(payload) {
  console.log("Payload", payload);
  yield call(insertUser, payload);
}

export function* callUserFun() {
  yield takeEvery(userSlice.actions.logInUser, callUserGetFun);
  yield takeEvery(userSlice.actions.registerUser, callUserRegFun);
}
