/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  createUser,
  allUsers,
  oneUser,
  removeUser,
  updateUser,
  registeredEmailCheck,
  createPassword,
  login,
  verifyToken,
  registerUser
} from '../controllers/userController';
import { Router, type Request, type Response } from 'express';

export const userRoutes = (io: any, sockets: Map<string, string>): Router => {
  const router = Router();

  router.post('/users/adduser', async (request: Request, response: Response) => {
    try {
      await createUser(request, response).then(() => {
        io.emit('addUser', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/users/check/:email', async (request: Request, response: Response) => {
    try {
      await registeredEmailCheck(request, response).then(() => {});
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/users/createpassword', async (request: Request, response: Response) => {
    try {
      await createPassword(request, response).then(() => {
        io.emit('createPassword', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/users/login', async (request: Request, response: Response) => {
    try {
      await login(request, response).then(() => {
        const email = request.body.email as string;
        const socketId = sockets.get(email);
        io.to(socketId).emit('loginStatus', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/users/verify', async (request: Request, response: Response) => {
    try {
      await verifyToken(request, response).then(() => {});
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/users/registerUser', async (request: Request, response: Response) => {
    try {
      await registerUser(request, response).then(() => {
        const email = request.body.email as string;
        const socketId = sockets.get(email);
        io.to(socketId).emit('registerUser', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/users', async (request: Request, response: Response) => {
    try {
      await allUsers(request, response).then(() => {
        io.emit('getUsers', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/users/:id', async (request: Request, response: Response) => {
    try {
      await oneUser(request, response).then(() => {
        io.emit('getOneUser', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete('/users/:id', async (request: Request, response: Response) => {
    try {
      await removeUser(request, response).then(() => {
        io.emit('removeUser', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/users/:id', async (request: Request, response: Response) => {
    try {
      await updateUser(request, response).then(() => {
        io.emit('editUser', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
