/* eslint-disable @typescript-eslint/no-misused-promises */
import { all, one, save, remove, update } from '../controllers/studentController';
import { Router, type Request, type Response } from 'express';

export const studentRoutes = (io: any, sockets: Map<string, string>): Router => {
  const router = Router();

  router.get('/students', async (request: Request, response: Response) => {
    try {
      await all(request, response).then(() => {
        io.emit('fetchAll', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/students/:id', async (request: Request, response: Response) => {
    try {
      await one(request, response).then(() => {
        io.emit('fetchOne', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/students', async (request: Request, response: Response) => {
    try {
      await save(request, response).then(() => {
        io.emit('add', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete('/students/:id', async (request: Request, response: Response) => {
    try {
      await remove(request, response).then(() => {
        io.emit('remove', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/students', async (request: Request, response: Response) => {
    try {
      await update(request, response).then(() => {
        io.emit('edit', response.statusCode);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
