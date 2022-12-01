/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { addStudentService } from '../services/studentService';

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
