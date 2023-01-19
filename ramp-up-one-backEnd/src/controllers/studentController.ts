import { Request, Response } from 'express';
import {
  getAllStudentService,
  saveStudentService,
  updateStudentService,
  deleteStudentService, 
  findStudent, 
} from '../services/studentService';
import { StudentModel } from '../utils/interfaces';
 
// import { io } from '../../index';
 import { io } from '../../socketServer';
import { checkValidation } from '../../../ramp-up-one/src/utils/validation';
import { validationStatus } from '../utils/validation';

//get all student 
export const getAllStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const student = await getAllStudentService();
    res.send(student);
  } catch (err) {
    res.status(400);
  }
};

//save Student
export const saveStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    if (checkValidation(req.body)) {
      const response = await saveStudentService(req.body);
      res.send(response);
      res.status(200);
      io.emit(
        'notification',
        'Student added successfully. Student:- ' + response.newStudent?.name
      );
    } else {
      res.send(validationStatus);
    }
  } catch (err) {
    res.status(400);
  }
};

//update Student
export const updateStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const studentStatus = await findStudent(req.body.id);
    if (studentStatus) {
      const response = await updateStudentService(req.body);
      res.send(response);
      io.emit(
        'notification',
        'Student has been updated, Student:- ' + response.newStudent?.name
      );
    } else {
      res.send('There is no such student..!');
    }
  } catch (err) {
    res.status(400);
  }
};

//delete Student
export const deleteStudent = async (req: Request, res: Response): Promise<any> => {
  try {
    const studentId = parseInt(req.params.ID);
    const response = await deleteStudentService(studentId);
    res.send(response);
    io.emit('notification', 'Student has been deleted');
  } catch (err) {
    res.status(400);
  }
};
