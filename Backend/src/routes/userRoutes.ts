import express from 'express';
import { signUp, signIn, signOut, refresh } from '../controllers/userController';
import passport from 'passport';
import '../configs/passport';

const userRoutes = express.Router();

userRoutes
  .post('/signup', signUp)
  .post('/signin', signIn)
  .delete('/signout', signOut)
  .post('/refresh', passport.authenticate('jwt-refresh', { session: false }), refresh);

export default userRoutes;
