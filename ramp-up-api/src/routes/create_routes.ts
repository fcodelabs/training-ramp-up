import * as express from 'express';
import { Student } from '../entity/Student';
const router = express.Router();

router.post('/api/student', async (req, res) => {
  const { name, gender, address, mobile_number, age } = req.body;
  const student = Student.create({
    name: name,
    gender: gender,
    address: address,
    mobile_number: mobile_number,
    age: age,
  });
  await student.save();
  res.send('Data added to DataBase');
  return res.status(200);
});

export { router as createStudentRouter };
