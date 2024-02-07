import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./student/slice";
import userSlice from "./user/slice";
import createSagaMiddleware from "redux-saga";
import { studentSaga } from "./student/saga";
import { userSaga } from "./user/saga";
import { rootSaga } from "./rootSaga";

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
