/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express';
import { Student } from '../models/student';
import AppDataSource from '../dataSource';

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentRepo = AppDataSource.getRepository(Student);
    const newStudent = studentRepo.create(req.body);
    await studentRepo.save(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
};
