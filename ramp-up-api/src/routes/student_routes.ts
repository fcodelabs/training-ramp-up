import * as express from 'express';
const router = express.Router();
import {
  getStudent,
  postStudent,
  findStudent,
  deleteStudent,
  updateStudent,
} from '../service/studentService';

router.get('/api', getStudent);
router.post('/api', postStudent);
router.get('/api/:studentId', findStudent);
router.delete('/api/:studentId', deleteStudent);
router.put('/api/:studentId', updateStudent);

export default router;
