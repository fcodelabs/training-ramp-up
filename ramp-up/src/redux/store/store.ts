import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import studentSlice from "../slices/studentSlice"
import authSlice from "../slices/authSlice";

import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    student: studentSlice,
    auth:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
    devTools: true
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;