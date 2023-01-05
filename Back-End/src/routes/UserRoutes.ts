import express from 'express';
import { loginUser, refreshToken, signupUser, logoutUser } from '../controllers/UserController';
import {
  userLoginValidationRules,
  userValidation,
  userSignupValidationRules,
} from '../utils/Validation/UserValidation';
import isAuthenticated from '../utils/Authentication';
import RoleCheck from '../utils/RoleCheck';

const userRouter = express.Router();

userRouter.post('/signup', userSignupValidationRules(), userValidation, signupUser);
userRouter.post('/login', userLoginValidationRules(), userValidation, loginUser);
userRouter.post('/refresh', refreshToken);
userRouter.delete('/logout', isAuthenticated, RoleCheck(['admin', 'user']), logoutUser);

export default userRouter;
