import express from 'express';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../controllers/Student';

const studentRouter = express.Router();

studentRouter.get('/', getStudents).post('/', addStudent).delete('/:id', deleteStudent).patch('/:id', updateStudent);

export default studentRouter;
