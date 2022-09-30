import * as express from 'express';
const router = express.Router();
import {
  getStudent,
  postStudent,
  findStudent,
  deleteStudent,
  updateStudent,
} from '../service/studentService';

const userMiddleware = require('../middleware/userMiddleware');

router.get('/api', userMiddleware, getStudent);
router.post('/api', userMiddleware, postStudent);
router.get('/api/:studentId', userMiddleware, findStudent);
router.delete('/api/:studentId', userMiddleware, deleteStudent);
router.put('/api/:studentId', userMiddleware, updateStudent);

export default router;
