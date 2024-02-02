/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, Router } from 'express';
import { createUser, emailSend } from '../controllers/users.controllers';

export default function userSocketRouter(io: any): Router {
  const userRouter = Router();
  userRouter.post('/newUser', async (req: Request, res: Response) => {
    try {
      await createUser(req, res).then(() => {
        io.emit('create_new_user', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  userRouter.post('/emailSend', async (req: Request, res: Response) => {
    try {
      await emailSend(req, res).then(() => {
        io.emit('send_email', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  return userRouter;
}
