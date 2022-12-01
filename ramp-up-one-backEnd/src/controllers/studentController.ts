import { Request, Response } from 'express';
import {
  getAllCustomerService,
  saveStudentService,
  updateStudentService,
  deleteStudentService,
} from '../services/studentService';

//get all student
export const getAllCustomer = async (req: Request, res: Response) => {
  const student = getAllCustomerService();
  res.send(student);
};

//save Student
export const saveStudent = async (req: Request, res: Response) => {
  const response = saveStudentService(req.body);
  res.send(response);
};

//update Student
export const updateStudent = async (req: Request, res: Response) => {
  const response = updateStudentService(req.body);
  res.send(response);
};

//delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  const studentId = parseInt(req.params.ID);
  console.log('studentId');
  console.log(studentId);
  const response = deleteStudentService(studentId);
  res.send(response);
};
