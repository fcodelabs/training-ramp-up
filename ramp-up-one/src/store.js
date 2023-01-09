import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './pages/DataGrid/studentSlice';
import SignInReducer from './pages/SignInPage/SignInSlice';
import studentSaga from './pages/DataGrid/saga';
import { SignInSaga } from './pages/SignInPage/SignInSaga';

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
