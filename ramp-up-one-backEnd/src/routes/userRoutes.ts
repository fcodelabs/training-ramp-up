import express from 'express';
import {
  saveUser,
  loginUser,
  refresh,
  logout,
} from '../controllers/userController';
const route = express.Router();
route.post('/register', saveUser);
route.post('/login', loginUser);
route.get('/logout', logout);
route.post('/refresh', refresh);

export default route;
