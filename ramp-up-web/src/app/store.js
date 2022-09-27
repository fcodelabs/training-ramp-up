import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/studentSlice";
import userSlice from "../features/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    students: studentSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
