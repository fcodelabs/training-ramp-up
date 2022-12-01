import express from 'express';
import { addStudent, getAllStudents } from '../controllers/studentController';

const router = express.Router();

router.post('/', addStudent);
router.get('/', getAllStudents);

export default router;
