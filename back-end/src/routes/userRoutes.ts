/* eslint-disable @typescript-eslint/no-misused-promises */
import { createUser, allUsers, oneUser, removeUser, updateUser } from '../controllers/userController';
import { Router, type Request, type Response } from 'express';

export const userRoutes = (io: any): Router => {
  const router = Router();

  router.post('/users', async (request: Request, response: Response) => {
    try {
      await createUser(request, response).then(() => {
        io.emit('addUser', response.statusCode);
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
