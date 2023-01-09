import axios from 'axios';
import axiosAuth from '../utils/interceptor';
import { LoginDetails } from '../utils/interfaces';
const baseUrl = 'http://localhost:8000/user';

// CRUD operations

export const getUserService = async (user: LoginDetails) => {
  const res = await axios.post(baseUrl + '/login', user, {
    withCredentials: true,
  });
  return res;
};



export const insertUserService = async (user: LoginDetails) => {
  const res = await axios.post(baseUrl + '/register', user, {
    withCredentials: true,
  });
  return res;
};

export const logoutUserService = async () => {
  const res = await axiosAuth.get('/user/logout', {
    withCredentials: true,
  });
  return res;
};

export const getUserDetails = async () => {
  const res = await axios.get(baseUrl + '/userDetail', {
    withCredentials: true,
  });
  return res;
};
