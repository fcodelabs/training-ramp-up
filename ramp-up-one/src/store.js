import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './pages/DataGrid/slices/studentSlice';
import SignInReducer from './pages/SignInPage/slices/SignInSlice';
import studentSaga from './pages/DataGrid/saga/saga';
import { SignInSaga } from './pages/SignInPage/saga/SignInSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentSlice: studentReducer,
    signIn: SignInReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(studentSaga);
sagaMiddleware.run(SignInSaga);
export default store;
