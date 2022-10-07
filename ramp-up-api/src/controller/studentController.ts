import { Student } from '../entity/Student';
import {
  getStudents,
  postStudent,
  deleteStudent,
  updateStudent,
} from '../service/studentService';

export const allStudent = async (req, res) => {
  try {
    const user = await getStudents();
    if (!user) return res.json('Error getAllStudent').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const findStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
};

export const addStudent = async (req, res) => {
  try {
    const user = await postStudent(req.body);
    if (!user) return res.josn('Error Add Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudents = async (req, res) => {
  console.log('detete student', req.id);
  try {
    const user = await deleteStudent(req);
    if (!user) return res.josn('Error Delete Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudents = async (req, res) => {
  try {
    const user = await updateStudent(req);
    if (!user) return res.josn('Error Update Student').status(400);
    return res.send({
      uesr: user,
    });
  } catch (error) {
    console.log(error);
  }
};
