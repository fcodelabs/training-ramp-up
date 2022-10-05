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

router.get('/', auth, allStudent);
router.post('/', auth, addStudent);
//router.get('/:studentId', findStudent);
router.delete('/:studentId', auth, deleteStudent);
router.put('/:studentId', auth, updateStudent);

export default router;
