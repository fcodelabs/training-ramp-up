import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./slice/studentSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import userSlice from "./slice/userSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    student: studentSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
