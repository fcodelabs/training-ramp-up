// src/routes/studentRoutes.ts
import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/Student';
import { studentValidation } from '../middlewares/expressValidator/studentValidation';

const router = express.Router();



router.get('/', getStudents);
router.post('/', studentValidation, createStudent);
router.put('/:id', studentValidation, updateStudent);
router.delete('/:id', deleteStudent);

export default router;
