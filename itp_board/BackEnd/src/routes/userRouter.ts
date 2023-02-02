import express from 'express'
import {authenticate, createUser, signOut, updateToken} from '../controllers/userController'
import { upDateTokens} from "../utils/refreshTokens";
import dotenv from 'dotenv';
import {validator} from "../middlewares/validator";
import {userValidations} from "../validations/userValidations";
dotenv.config();
const userRouter: express.Router = express.Router();

userRouter.post('/',userValidations,validator, createUser);
userRouter.post('/login',authenticate);
userRouter.post('/refreshtoken',updateToken);
userRouter.delete('/signout',signOut);

export default userRouter;