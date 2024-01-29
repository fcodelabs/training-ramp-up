// src/routes/studentRoutes.ts
import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/Student';
import { createStudentValidation } from '../middlewares/expressValidator/createStudentValidation';

const router = express.Router();



router.get('/', getStudents);
router.post('/', createStudentValidation, createStudent);
router.put('/:id', createStudentValidation, updateStudent);
router.delete('/:id', deleteStudent);

export default router;
