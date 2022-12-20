import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice/HomeSlice";
import createSagaMiddleware from "redux-saga";
import HomeSaga from "./saga/HomeSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware: middleware,
});

sagaMiddleware.run(HomeSaga);

export default store;
