import { Student } from '../entity/Student';

export const getStudent = async (req, res) => {
  const student = await Student.find();
  res.send(student);
};

export const findStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
};

export const postStudent = async (req, res) => {
  const { name, gender, address, mobile_number, date, age } = req.body;
  const student = Student.create({
    name: name,
    gender: gender,
    address: address,
    mobile_number: mobile_number,
    date: date,
    age: age,
  });
  await student.save();
  console.log(' Insert Item Dalin', student);
  res.json(student);
  return res.status(200);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const response = await Student.delete(studentId);
  return res.json(response);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  Student.merge(student, req.body);
  const result = await Student.save(student);
  res.json(result);
};
