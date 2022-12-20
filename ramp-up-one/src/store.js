import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './pages/DataGrid/studentSlice';
import studentSaga from './pages/DataGrid/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentSlice: studentReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(studentSaga);
export default store;
