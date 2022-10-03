import express from 'express';
const router = express.Router();
import {
  allStudent,
  addStudent,
  findStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentController';
const auth = require('../middleware/auth');

router.post('/student', auth, allStudent);
router.post('/', addStudent);
router.get('/:studentId', findStudent);
router.delete('/:studentId', deleteStudent);
router.put('/:studentId', updateStudent);

export default router;
