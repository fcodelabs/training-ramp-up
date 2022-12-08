import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./pages/Home/HomeSlice";
import createSagaMiddleware from "redux-saga";
import HomeSaga from "./pages/Home/HomeSaga";

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
