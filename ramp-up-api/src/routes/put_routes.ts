import * as express from 'express';
import { Student } from '../entity/Student';
const router = express.Router();

router.put('/api/students/:studentId', async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  Student.merge(student, req.body);
  const result = await Student.save(student);
  res.json({
    message: 'success',
    payload: result,
  });
});
export { router as putStudentRouter };
