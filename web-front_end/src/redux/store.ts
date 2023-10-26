import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./student/studentSlice";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { userReducer } from "./user/userSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentEntries: studentReducer,
    userEntries: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
