import * as express from 'express';
import { Student } from '../entity/Student';
const router = express.Router();

router.delete('/api/student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  const response = await Student.delete(studentId);

  return res.json(response);
});

export { router as deleteClientRouter };
