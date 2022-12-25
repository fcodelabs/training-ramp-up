import axios from 'axios';
import { LoginDetails } from '../utils/interfaces';

// CRUD operations

export const getUserService = async (user: LoginDetails) => {
  const res = await axios.post('http://localhost:8000/user/login', user);
  return res;
};

export const insertUserService = async (user: LoginDetails) => {
  const res = await axios.post('http://localhost:8000/user/register', user);
  return res;
};

