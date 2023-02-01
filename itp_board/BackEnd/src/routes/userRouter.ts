import express from 'express'
import {authonticate, createUser, signOut, updateToken} from '../controllers/userController'
import { upDateTokens} from "../utils/refreshTokens";
import dotenv from 'dotenv';
dotenv.config();
const userRouter: express.Router = express.Router();

userRouter.post('/',createUser);
userRouter.post('/login',authonticate);
userRouter.post('/refreshtoken',updateToken);
userRouter.delete('/signout',signOut);

export default userRouter;