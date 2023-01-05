import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/HomeSlice";
import userReducer from "../slice/UserSlice";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    student: studentReducer,
    user: userReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export default store;
