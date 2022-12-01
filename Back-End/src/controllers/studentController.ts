/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { addStudentService, getAllStudentsService, updateStudentService } from '../services/studentService';

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await addStudentService(req.body).catch((err: any) => {
      res.status(500);
      res.json(err);
      return;
    });
    res.status(200);
    res.json(student);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

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

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await updateStudentService(req.body).catch((err: any) => {
      res.status(500);
      res.json(err);
      return;
    });
    res.status(200);
    res.json(student);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
