import { Request, Response, NextFunction } from 'express';
import {
  addStudentService,
  getStudentsService,
  deleteStudentService,
  updateStudentService,
} from '../services/studentServices';
import { io } from '../../app';

export const getStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const students = await getStudentsService();
    res.status(200).send(students);
  } catch (error) {
    next(error);
  }
};

export const addStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const student = await addStudentService(req.body);
    res.status(200).send(student);
    io.emit('notification', `New student added with name ${student.name}`);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deletedStudent = await deleteStudentService(id);
    res.status(200).send(`Student deleted Successfully with name ${deletedStudent && deletedStudent.name}`);
    io.emit('notification', `Student deleted Successfully with name ${deletedStudent && deletedStudent.name}`);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const response = await updateStudentService(id, req.body);
    res.status(200).send('Student updated Successfully');
    io.emit('notification', `Student updated Successfully with name ${response.name}`);
  } catch (error) {
    next(error);
  }
};
