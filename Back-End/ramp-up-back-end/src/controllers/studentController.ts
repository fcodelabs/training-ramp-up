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
  try {
    const student = req.body;
    const response = await createStudentService(student);
    res.status(201);
    res.json(response);
    return;
  } catch (err) {
    console.log("Add Student Error ", err);
    res.status(400);
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudentService();
    res.status(200);
    res.json(students);
  } catch (err) {
    console.log("Get All Student Error ", err);
    res.status(400);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const student = await findStudentService(studentId);

    if (student) {
      if (!("err" in student)) {
        mergeStudentService(student, req.body);
        const results = await saveStudentService(student);
        res.status(200);
        res.json(results);
        return;
      }
    }
  } catch (err) {
    console.log("Update Student Error", err);
    res.status(400);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const results = await deleteStudentService(studentId);
    res.status(200);
    res.json(results);
  } catch (err) {
    console.log("Delete Student Error ", err);
    res.status(400);
  }
};
