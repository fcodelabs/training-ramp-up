import { Request, Response } from 'express';
import { Student } from '../../entities/studentEntity';
import {
  getAllStudent, 
  saveStudent,
  updateStudent,
  deleteStudent,
} from '../studentController';
import { StudentModel } from '../../utils/interfaces';
import * as studentServices from '../../services/studentService';

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe('Student Controller', () => {

  describe('Get All Student', () => {
    const allStudents = [
      {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    ];

    const req = {} as Request;
    const res = mockResponse();

    test('Get All Student Success', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'getAllStudentService')
        .mockResolvedValue(allStudents);
      await getAllStudent(req, res);
      expect(res.send).toHaveBeenCalledWith(allStudents);
      spyGetStudents.mockRestore();
    });

    test('Get All Student Fail', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'getAllStudentService')
        .mockRejectedValue(null);
      await getAllStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyGetStudents.mockRestore();
    });
  });

  describe('Add Student', () => {
    const newStudent: StudentModel = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    const req = {
      body: {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    } as Request;
    const res = mockResponse();

    test('Add new Student Success', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'saveStudentService')
        .mockResolvedValue(newStudent);
      await saveStudent(req, res);
      expect(res.send).toHaveBeenCalledWith(newStudent);
      spyGetStudents.mockRestore();
    });

    test('Add new Student Fail', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'saveStudentService')
        .mockRejectedValue(null);
      await saveStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      spyGetStudents.mockRestore();
    });
  });

   describe('Update Student', () => {
     const newStudent: StudentModel = {
       name: 'dilshan',
       gender: 'Male',
       address: 'colombo6',
       mobileNo: '011244',
       birth: new Date(2 / 24 / 2003),
       age: 22,
       id: 1,
     };
     const req = {
       body: {
         name: 'dilshan',
         gender: 'Male',
         address: 'colombo6',
         mobileNo: '011244',
         birth: new Date(2 / 24 / 2003),
         age: 22,
         id: 1,
       },
     } as Request;
     const res = mockResponse();

     test('Update Student Success', async () => {
       const spyGetStudents = jest
         .spyOn(studentServices, 'updateStudentService')
         .mockResolvedValue(newStudent);
       await updateStudent(req, res);
       expect(res.send).toHaveBeenCalledWith(newStudent);
       spyGetStudents.mockRestore();
     });

     test('Update Student Fail', async () => {
       const spyGetStudents = jest
         .spyOn(studentServices, 'updateStudentService')
         .mockRejectedValue(null);
       await updateStudent(req, res);
       expect(res.status).toHaveBeenCalledWith(400);
       spyGetStudents.mockRestore();
     });
   });

   describe('Delete Student', () => {
     const id = 1 as any;

     const req = {
       params: {
         studentId: 1,
       },
     } as any;

     const res = mockResponse();

     test('Delete Student Success', async () => {
       const spyDeleteStudent = jest
         .spyOn(studentServices, 'deleteStudentService')
         .mockResolvedValue(id);
       await deleteStudent(req, res);
       expect(res.send).toHaveBeenCalledWith(id);
       spyDeleteStudent.mockRestore();
     });

     test('Delete Student Fail', async () => {
       const spyDeleteStudent = jest
         .spyOn(studentServices, 'deleteStudentService')
         .mockRejectedValue(null);
       await deleteStudent(req, res);
       expect(res.status).toHaveBeenCalledWith(400);
       spyDeleteStudent.mockRestore();
     });
   });
});
