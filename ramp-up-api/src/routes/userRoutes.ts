import express from 'express';
const router = express.Router();

import { postUser, getUser, findUser } from '../controllers/userControlls';

router.post('/signin', postUser);
//router.get('/signin', getUser);
router.get('/login', findUser);

export default router;
