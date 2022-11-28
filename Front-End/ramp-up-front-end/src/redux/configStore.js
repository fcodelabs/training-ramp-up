import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/student/studentSlice";
import userReducer from "../redux/user/userSlice";
import createSagaMiddleware from "redux-saga";
//import studentSaga from "../saga/studentSaga";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentReducer: studentReducer,
    userReducer: userReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export default store;
