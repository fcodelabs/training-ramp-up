import express from 'express';
import { signUp, signIn, signOut, refresh } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/signup', signUp).post('/signin', signIn).delete('/signout', signOut).post('/refresh', refresh);

export default userRoutes;
