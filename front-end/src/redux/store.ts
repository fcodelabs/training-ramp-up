import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentsSlice/stdentsSlice';
import createSagaMiddleware from "redux-saga";
import watchStudentSage from './sagas/studentSagas';

const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(watchStudentSage);

export default store;
export type RootState = ReturnType<typeof store.getState>;