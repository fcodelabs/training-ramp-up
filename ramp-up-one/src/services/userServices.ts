import axios from 'axios';
import { LoginDetails } from '../utils/interfaces';

// CRUD operations

export const getUserService = async (user: LoginDetails) => {
  const res = await axios.post('http://localhost:8000/user/login', user, {
    withCredentials: true,
  });
  return res;
};

export const insertUserService = async (user: LoginDetails) => {
  const res = await axios.post('http://localhost:8000/user/register', user, {
    withCredentials: true,
  });
  return res;
};

export const newAccessTokenService = async () => {
  const res = await axios.post('http://localhost:8000/user/refresh',{},{
    withCredentials: true,
  });
  return res;
  
};

export const logoutUserService = async () => {
  try {
    const res = await axios.get('http://localhost:8000/user/logout', {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};