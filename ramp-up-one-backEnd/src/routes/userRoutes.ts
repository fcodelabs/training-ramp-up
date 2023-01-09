import express from 'express';
import {
  saveUser,
  loginUser,
  refresh,
  logout,
  userDetail,
} from '../controllers/userController';
import { authorization, permissions } from '../middlewares/checkAuth';
const route = express.Router();
route.post('/register', saveUser);
route.get('/userDetail', userDetail);
route.post('/login', loginUser);
route.get('/logout',authorization, logout);
route.post('/refresh', refresh);

export default route; 
