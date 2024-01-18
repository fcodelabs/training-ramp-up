/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  updateStudent
} from '../controllers/student.controller';

const router = Router();

router.post('/newStudent', createStudent);
router.get('/getAllStudents', getAllStudents);
router.put('/updateStudent/:id', updateStudent);

export default router;
