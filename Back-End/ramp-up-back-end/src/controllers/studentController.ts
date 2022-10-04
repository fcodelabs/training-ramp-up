import { Request, Response } from "express";
import {
  createStudentService,
  deleteStudentService,
  findStudentService,
  getAllStudentService,
  mergeStudentService,
  saveStudentService,
} from "../services/studentService";

export const addStudent = async (req: Request, res: Response) => {
  createStudentService(
    req.body.name,
    req.body.gender,
    req.body.address,
    req.body.mobile,
    req.body.birthday,
    req.body.age
  );
  return res.json();
};

export const getAllStudents = async (req: Request, res: Response) => {
  const students = getAllStudentService();
  res.send(students);
};

export const updateStudent = async (req: Request, res: Response) => {
  const studentId = parseInt(req.params.studentId);
  const student = await findStudentService(studentId);

  if (student) {
    mergeStudentService(student, req.body);
    const results = saveStudentService(student);
    return res.send(results);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const studentId = parseInt(req.params.studentId);
  const results = await deleteStudentService(studentId);
  return res.send(results);
};
