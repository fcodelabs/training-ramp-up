/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, Router } from 'express';
import {
  createStudent,
  getAllStudents,
  removeStudent,
  updateStudent
} from '../controllers/student.controller';

function socketRouter(io: any): Router {
  const router = Router();

  router.post('/newStudent', async (req: Request, res: Response) => {
    try {
      await createStudent(req, res).then(() => {
        io.emit('create_new_student', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  router.get('/getAllStudents', async (req: Request, res: Response) => {
    try {
      await getAllStudents(req, res).then(() => {
        io.emit('get_all_students', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  router.put('/updateStudent/:id', async (req: Request, res: Response) => {
    try {
      await updateStudent(req, res).then(() => {
        io.emit('update_student', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });
  router.delete('/removeStudent/:id', async (req: Request, res: Response) => {
    try {
      await removeStudent(req, res).then(() => {
        io.emit('remove_student', res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

export default socketRouter;
