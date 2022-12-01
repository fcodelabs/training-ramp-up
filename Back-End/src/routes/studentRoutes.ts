import express from 'express';
import { addStudent, getAllStudents, updateStudent } from '../controllers/studentController';

const router = express.Router();

router.post('/', addStudent);
router.get('/', getAllStudents);
router.put('/:id', updateStudent);

export default router;
