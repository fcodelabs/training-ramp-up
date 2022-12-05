/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  addStudentService,
  getAllStudentsService,
  findStudentService,
  deleteStudentService,
  mergeStudentService,
  saveStudentService,
} from '../services/studentService';

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await addStudentService(
      req.body.id,
      req.body.name,
      req.body.gender,
      req.body.address,
      req.body.mobile,
      req.body.birthday
    );
    res.status(201);
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
  const id = parseInt(req.params.id);
  const student = await findStudentService(id);

  if (student) {
    mergeStudentService(student, req.body);
    const results = await saveStudentService(student);
    return res.send(results);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteStudentService(id);
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};
