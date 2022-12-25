import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './pages/DataGrid/studentSlice';
import SignInReducer from './pages/SignInPage/SignInSlice';
import SignUpReducer from './pages/SignUpPage/SignUpSlice';
import studentSaga from './pages/DataGrid/saga';
import { SignInSaga } from './pages/SignInPage/SignInSaga';
import { SignUpSaga } from './pages/SignUpPage/SignUpSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    studentSlice: studentReducer,
    signIn: SignInReducer,
    signUp: SignUpReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(studentSaga);
sagaMiddleware.run(SignInSaga);
sagaMiddleware.run(SignUpSaga);
export default store;
