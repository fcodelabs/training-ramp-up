import express from 'express';
import { loginUser, refreshToken, signupUser, logoutUser } from '../controllers/UserController';
import {
  userLoginValidationRules,
  userValidation,
  refreshTokenValidationRules,
  userSignupValidationRules,
} from '../utils/Validation/UserValidation';

const userRouter = express.Router();

userRouter.post('/signup', userSignupValidationRules(), userValidation, signupUser);
userRouter.post('/login', userLoginValidationRules(), userValidation, loginUser);
userRouter.post('/', refreshTokenValidationRules(), refreshToken);
userRouter.delete('/', logoutUser);

export default userRouter;
