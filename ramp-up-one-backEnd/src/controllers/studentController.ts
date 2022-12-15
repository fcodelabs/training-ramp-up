import { Request, Response } from 'express';
import {
  getAllCustomerService,
  saveStudentService,
  updateStudentService,
  deleteStudentService,
  findStudent,
} from '../services/studentService';
import { StudentModel } from '../utils/interfaces';
import { io } from '../../index';
let validationStatus = '';

function checkValidation(dataItem: StudentModel) {
  const nameRegEx = /^[A-z ]{5,20}$/;
  const addressRegEx = /^[A-z ]{5,20}$/;
  const mobileRegEx = /^[0-9]{5,11}$/;

  let fieldStatus = false;
  if (dataItem.name !== undefined && nameRegEx.test(dataItem.name)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check name field....!';
    console.log('check name field....!');
    return;
  }

  if (dataItem.address !== undefined && addressRegEx.test(dataItem.address)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check address field....!';
    console.log('check address field....!');
    return;
  }

  if (
    (dataItem.gender !== undefined && dataItem.gender == 'Male') ||
    dataItem.gender == 'Female'
  ) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check gender field....!';
    console.log('check gender field....!');
    return;
  }

  if (dataItem.mobileNo !== undefined && mobileRegEx.test(dataItem.mobileNo)) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check mobileNo field....!';
    console.log('check mobileNo field....!');
    return;
  }

  if (dataItem.birth !== undefined) {
    fieldStatus = true;
  } else {
    fieldStatus = false;
    validationStatus = 'check birth day field....!';
    console.log('check birth day field....!');
    return;
  }

  // if (dataItem.age > 18) {
  //   fieldStatus = true;
  // }else{
  //   fieldStatus = false;
  //   validationStatus =
  //     'check birth day field,age needs to be more than 18 years....!';
  //   console.log('check birth day field,age needs to be more than 18 years....!');
  //   return;
  // }
  return fieldStatus;
}

//get all student
export const getAllCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const student = await getAllCustomerService();
    res.send(student);
  } catch (err) {
    res.send('Error' + err);
  }
};

//save Student
export const saveStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (checkValidation(req.body)) {
      const response = await saveStudentService(req.body);
      res.send(response);
      io.emit('notification', 'Student has been added');
    } else {
      res.send(validationStatus);
    }
  } catch (err) {
    res.send('Error' + err);
  }
};

//update Student
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (checkValidation(req.body)) {
      const studentStatus = await findStudent(req.body.id);
      if (studentStatus) {
        const response = await updateStudentService(req.body);
        res.send(response);
        io.emit('notification', 'Student has been updated');
      } else {
        res.send('There is no such student..!');
      }
    } else {
      res.send(validationStatus);
    }
  } catch (err) {
    res.send('Error' + err);
  }
};

//delete Student
export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = parseInt(req.params.ID);
    const response = await deleteStudentService(studentId);
    res.send(response);
    io.emit('notification', 'Student has been deleted');
  } catch (err) {
    res.send('Error' + err);
  }
};
