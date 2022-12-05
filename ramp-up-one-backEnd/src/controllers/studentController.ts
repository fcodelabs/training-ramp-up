import { Request, Response } from 'express';
import {
  getAllCustomerService,
  saveStudentService,
  updateStudentService,
  deleteStudentService,
} from '../services/studentService';

//get all student
export const getAllCustomer = async (req: Request, res: Response) => {
  const student = await getAllCustomerService();
  console.log('student demo');
  console.log(student);
  res.send(student);
};

//save Student
export const saveStudent = async (req: Request, res: Response) => {
  const response = await saveStudentService(req.body);
  res.send(response);
};

//update Student
export const updateStudent = async (req: Request, res: Response) => {
  const response = await updateStudentService(req.body);
  res.send(response);
};

//delete Student
export const deleteStudent = async (req: Request, res: Response) => {
  const studentId = parseInt(req.params.ID);
  const response = await deleteStudentService(studentId);
  res.send(response);
};
