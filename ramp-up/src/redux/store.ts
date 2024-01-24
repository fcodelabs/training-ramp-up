import { configureStore, Middleware } from "@reduxjs/toolkit";
import { studentReducer } from "./slices/studentSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(sagaMiddleware as Middleware),
    
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
