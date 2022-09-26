import express from 'express';
const router = express.Router();

import { postUser, getUser, findUser } from '../controllers/userControlls';

const user = [
  {
    user: '',
    password: '',
  },
];
router.post('/signin', postUser);
//router.get('/signin', getUser);
router.get('/signin', findUser);

export default router;
