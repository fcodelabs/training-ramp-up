import express from 'express';
import {
  saveUser,
  loginUser,
} from '../controllers/userController';

const route = express.Router();
route.post('/register', saveUser);
route.post('/login', loginUser);

export default route;
