/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { io } from '../../server';
import {
  getAllStudentsService,
  deleteStudentService,
  addStudentService,
  updateStudent,
} from '../services/studentService';

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
    res.status(401);
    res.json(err);
  }
};

// add student controller

export const addStudent = async (req: Request, res: Response) => {
  try {
    await addStudentService(req.body);
    io.emit('message', 'Student ' + req.body.name + ' added');
    res.status(200);
    res.json({ message: 'Student added successfully' });
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

// patch student controller

export const patchStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Hello Update');
    const students = await updateStudent(req.body);
    res.send(students);
    io.emit('notification', 'The with id ' + req.body.id + ' student has been updated');
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

// delete student controller

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id);
    await deleteStudentService(studentId);
    io.emit('message', 'Student Id : ' + studentId + ' deleted');
    res.status(200);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};
