import express from 'express';
import { getAllStudents, upsertStudent, deleteStudent } from '../controllers/studentController';

const router = express.Router();

router.post('/', upsertStudent);
router.get('/', getAllStudents);
router.delete('/:id', deleteStudent);

export default router;
