import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/studentSlice";
import createSagaMiddleware from "redux-saga";
import studentSaga from "../saga/studentSaga";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentReducer: studentReducer,
  },
  middleware: [saga],
});

saga.run(studentSaga);

export default store;
