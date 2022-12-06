/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getAllStudentsService, deleteStudentService, upsertStudentService } from '../services/studentService';

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

export const upsertStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = await upsertStudentService(req.body);
    res.status(200);
    res.json(studentRepository);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await deleteStudentService(req.params.id);
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
