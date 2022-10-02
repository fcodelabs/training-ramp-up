import { Student } from '../entity/Student';

export const getStudent = async (res) => {
  const student = await Student.find();
  if (!student) {
    console.log('Student not found');
  }
  return student;
  // res.send(student);
};
