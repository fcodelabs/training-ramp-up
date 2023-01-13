import express from 'express';
import { loginUser, refreshToken, signupUser, logoutUser, userDetails } from '../controllers/userController';
import {
  userLoginValidationRules,
  userValidation,
  userSignupValidationRules,
} from '../utils/Validation/userValidation';
import isAuthenticated from '../utils/authentication';

const userRouter = express.Router();

userRouter.post('/signup', userSignupValidationRules(), userValidation, signupUser);
userRouter.post('/login', userLoginValidationRules(), userValidation, loginUser);
userRouter.post('/refresh', refreshToken);
userRouter.post('/userDetails', isAuthenticated, userDetails);
userRouter.delete('/logout', isAuthenticated, logoutUser);

export default userRouter;
