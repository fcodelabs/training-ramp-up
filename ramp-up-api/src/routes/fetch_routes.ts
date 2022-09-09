import * as express from 'express';
import { Student } from '../entity/Student';
const router = express.Router();

router.get('/api/students/:studentId', async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
});

const router2 = express.Router();
router2.get('/api/students', async (req, res) => {
  const student = await Student.find();
  res.send(student);
});
export { router as fetchStudentRouter };
export { router2 as fetchAllStudentRouter };
