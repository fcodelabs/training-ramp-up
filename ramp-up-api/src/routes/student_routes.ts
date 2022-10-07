import * as express from 'express';
const router = express.Router();
import {
  allStudent,
  findStudent,
  addStudent,
  deleteStudents,
  updateStudents,
} from '../controller/studentController';
const Admin = require('../middleware/admin');

const userMiddleware = require('../middleware/userMiddleware');
//console.log('student Middlewar', getStudent);
router.get('/api', userMiddleware, allStudent);
router.post('/api', Admin, userMiddleware, addStudent);
router.get('/api/:studentId', Admin, userMiddleware, findStudent);
router.delete('/api/:studentId', Admin, userMiddleware, deleteStudents);
router.put('/api/:studentId', Admin, userMiddleware, updateStudents);

export default router;
