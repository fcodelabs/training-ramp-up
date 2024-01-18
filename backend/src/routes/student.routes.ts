/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  removeStudent,
  updateStudent
} from '../controllers/student.controller';

const router = Router();

router.post('/newStudent', createStudent);
router.get('/getAllStudents', getAllStudents);
router.put('/updateStudent/:id', updateStudent);
router.delete('/removeStudent/:id', removeStudent);

export default router;
