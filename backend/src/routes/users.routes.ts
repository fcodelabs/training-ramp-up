/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, Router } from 'express';
import {
  createUser,
  emailSend,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/users.controllers';
import { verifyToken } from '../middleware/auth';

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
  userRouter.post('/registerUser', async (req: Request, res: Response) => {
    try {
      await registerUser(req, res).then(() => {
        io.emit('register_user', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  userRouter.post('/loginUser', async (req: Request, res: Response) => {
    try {
      const role = await loginUser(req, res);
      console.log('role ' + role);
      if (role !== null) {
        io.emit('login_user', { statusCode: res.statusCode, role });
      }
    } catch (error) {
      console.error(error);
    }
  });

  userRouter.get('/getUsers', verifyToken, getAllUsers);
  userRouter.post('/logoutUser', async (req: Request, res: Response) => {
    try {
      await logoutUser(req, res).then(() => {
        console.log(res.statusCode);
        io.emit('logout_user', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  return userRouter;
}
