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
    const students = await getAllStudentsService();
    res.status(200).send(students);
  } catch (err) {
    res.status(400).send({ err: 'students get failed' });
  }
};

// add student controller

export const addStudent = async (req: Request, res: Response) => {
  try {
    await addStudentService(req.body);
    io.emit('message', 'Student ' + req.body.name + ' added');
    res.status(200).send({ message: 'Student added successfully' });
  } catch (err) {
    res.status(400).send({ err: 'not success' });
  }
};

// patch student controller

export const patchStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await updateStudent(req.body);
    res.status(200).send(students);
    io.emit('notification', 'The with id ' + req.body.id + ' student has been updated');
  } catch (err) {
    res.status(400).send({ err: 'update failed' });
  }
};

// delete student controller

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id);
    await deleteStudentService(studentId);
    io.emit('message', 'Student Id : ' + studentId + ' deleted');
    res.status(200).send({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).send({ err: 'Delete Failed' });
  }
};
