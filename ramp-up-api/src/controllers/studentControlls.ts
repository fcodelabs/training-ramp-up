import { Student } from '../entity/Student';

export const getStudent = async (req, res) => {
  const student = await Student.find();
  if (student) {
    res.send(student);
  }
  // res.send(student);
};

export const findStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
};

export const postStudent = async (req, res) => {
  const { name, gender, address, mobileNo, birth, age } = req.body;
  const student = Student.create({
    name: name,
    gender: gender,
    address: address,
    mobileNo: mobileNo,
    birth: birth,
    age: age,
  });
  await student.save();
  return res.json(student);
  //return res.status(200);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const response = await Student.delete(studentId);
  console.log('DELETSTUDENTRES', response);
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
