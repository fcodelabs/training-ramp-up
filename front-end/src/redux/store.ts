import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentReducer";
import { rootSaga } from "../saga/rootSaga";
import usersReducer from "./userReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    students: studentsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
