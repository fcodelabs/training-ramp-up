import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './slice/studentSlice';
import studentSaga from './saga/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentSlice: studentReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(studentSaga);
export default store;
