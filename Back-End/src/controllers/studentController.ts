/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  getAllStudentsService,
  deleteStudentService,
  findStudentService,
  mergeStudentService,
  saveStudentService,
  addStudentService,
} from '../services/StudentService';

// get all students controller

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudentsService().catch((err: any) => {
      res.status(500);
      res.json(err);
      return;
    });
    res.status(200);
    res.json(students);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

// add student controller

export const addStudent = async (req: Request, res: Response) => {
  try {
    await addStudentService(req.body);
    res.status(200);
    res.json({ message: 'Student added successfully' });
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

// update student controller

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = await findStudentService(studentId);
    if (student) {
      mergeStudentService(student, req.body);
      const results = await saveStudentService(student);
      return res.send(results);
    }
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

// patch student controller
export const patchStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = await findStudentService(studentId);
    if (student) {
      mergeStudentService(student, req.body);
      const results = await saveStudentService(student);
      return res.send(results);
    }
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

// delete student controller

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id);
    await deleteStudentService(studentId);
    res.status(200);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
