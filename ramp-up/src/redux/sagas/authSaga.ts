import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { createUser, getUserCredentials, getUserDetails, loginFailure, loginSuccess, setUser } from '../slices/authSlice';
import { storeInSession } from '../../utility/sessionStorage';
import { store } from '../store/store';


export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_CLOUD_URL,
  
});


  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (error) => {
  //     if (error.response && error.response.status === 401) {
  //       try {
  //         const originalRequest = error.config;
  //         const refreshToken = store.getState().auth.refreshToken;
  //         const { data } = await axios.post('http://localhost:4000/api/users/refresh', { refreshToken });
  //         store.dispatch(loginSuccess(data.accessToken));
  //         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
  //         return axiosInstance(originalRequest);
  //       } catch (refreshError) {
  //         yield put(loginFailure('Session expired. Please log in again.'));
  //         console.error(refreshError);
  //       }
  //     } else {
  //       return Promise.reject(error);
  //     }
  //   }
  // );

function* setUserWorker(action:any) {
  try {
    const { data } = yield call(axios.post, 
     // 'http://localhost:4000/api/users/login', action.payload);
      `https://training-ramp-up-new.onrender.com/api/users/login`, action.payload);

    yield put(loginSuccess());
    yield put(setUser(data)); 
    storeInSession('user', JSON.stringify(data));
  } catch (error:any) {
    yield put(loginFailure(error.response?.data.error || 'Login failed. Please check your credentials.'));
    console.error(error.response?.data.error);
  }
}

function* createUserWorker(action:any) {
    try {
      const { data } = yield call(axios.post, 
        //'http://localhost:4000/api/users/register', action.payload);
       `https://training-ramp-up-new.onrender.com/api/users/register` , action.payload);
  
      yield put(loginSuccess());
      yield put(createUser(data)); 
      storeInSession('user', JSON.stringify(data));
    } catch (error:any) {
      yield put(loginFailure(error.response?.data.error || 'Login failed. Please check your credentials.'));
      console.error(error.response?.data.error);
    }
  }

export function* authSaga() {
  yield takeLatest(getUserCredentials, setUserWorker);
  yield takeLatest(getUserDetails, createUserWorker);
}
