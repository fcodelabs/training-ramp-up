import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/studentSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    students: studentSlice.reducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
