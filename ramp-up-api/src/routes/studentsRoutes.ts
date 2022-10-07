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
const adminAuth = require('../middleware/admin.auth');

router.get('/', auth, allStudent);
router.post('/', auth, adminAuth, addStudent);
router.delete('/:studentId', auth, adminAuth, deleteStudent);
router.put('/:studentId', auth, adminAuth, updateStudent);

export default router;
