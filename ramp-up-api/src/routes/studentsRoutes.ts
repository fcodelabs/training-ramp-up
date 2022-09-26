import express from 'express';
const router = express.Router();
import {
  getStudent,
  postStudent,
  findStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentControlls';

router.get('/', getStudent);

router.post('/', postStudent);
router.get('/:studentId', findStudent);
router.delete('/:studentId', deleteStudent);
router.put('/:studentId', updateStudent);

export default router;
