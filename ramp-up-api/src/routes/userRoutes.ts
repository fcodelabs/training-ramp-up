import express from 'express';
const router = express.Router();

import { postUser, findUser } from '../controllers/userControlls';

router.post('/signin', postUser);

router.post('/login', findUser);

export default router;
