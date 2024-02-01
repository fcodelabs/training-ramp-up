/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/users.controllers';

export const userRouter = Router();

userRouter.get('/getAllUsers', getAllUsers);
userRouter.post('/newUser', createUser);

export default userRouter;
