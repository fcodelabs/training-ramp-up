import express from 'express';
import { signUp, signIn, signOut, refresh } from '../controllers/userController';
import passport from 'passport';
import '../configs/passport';
import { userSignUpOrSignInValidationRules, userValidation } from '../utils/validation/userValidation';

const userRoutes = express.Router();

userRoutes
  .post('/signup', userSignUpOrSignInValidationRules(), userValidation, signUp)
  .post('/signin', userSignUpOrSignInValidationRules(), userValidation, signIn)
  .delete('/signout', signOut)
  .post('/refresh', passport.authenticate('jwt-refresh', { session: false }), refresh);

export default userRoutes;
