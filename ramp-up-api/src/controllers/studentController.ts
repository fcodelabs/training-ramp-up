import { Student } from '../entity/Student';
import {
  addOne,
  deleteOne,
  getAll,
  updateOne,
} from '../services/studentService';

export const allStudent = async (req, res) => {
  try {
    const user = await getAll();
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
  const student = req.body;
  try {
    const user = await addOne(student);
    if (!user) return res.json('Error Add Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (req, res) => {
  const studentId = req.params;
  try {
    const user = await deleteOne(studentId);
    if (!user) return res.json('Error Delete Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (req, res) => {
  const student = req.body;
  try {
    const user = await updateOne(student);
    if (!user) return res.json('Error Update Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
