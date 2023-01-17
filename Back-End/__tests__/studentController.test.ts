/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { addStudent, deleteStudent, getAllStudents, patchStudent } from '../src/controllers/studentController';
import { Student } from '../src/entities/student';
import * as studentServices from '../src/services/studentService';

describe('Student Controller Test', () => {
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Add Student Test Case', () => {
    const newStudent = {
      id: 1,
      name: 'stuname',
      gender: 'Male',
      address: 'newAddress1',
      mobile: '0123456789',
      birthday: new Date('1998-12-10'),
      age: 24,
    } as Student;

    const req1 = {
      body: {
        name: 'stuname',
        gender: 'Male',
        address: 'newAddress1',
        mobile: '0123456789',
        birthday: '1998-12-10',
        age: 24,
      },
    } as Request;

    const req2 = {
      body: {
        name: 'stuname',
        gender: 'Male',
        address: 'newAddress1',
        mobile: '01234569',
        birthday: '1998-12-10',
        age: 24,
      },
    } as Request;

    const res = response();

    test('Add Student Success', async () => {
      const spyAddStudent = jest.spyOn(studentServices, 'addStudentService').mockResolvedValue(newStudent as any);
      await addStudent(req1, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Student added successfully' });
      spyAddStudent.mockRestore();
    });

    test('Add Student Fail', async () => {
      await addStudent(req2, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ err: 'not success' });
    });
  });

  describe('Get All Students Test Case', () => {
    const studentResults = [
      {
        id: 1,
        name: 'student1',
        gender: 'Male',
        address: 'newAddress1',
        mobile: '0112463256',
        birthday: '1998-12-10',
        age: 24,
      },
    ];

    const req = {} as Request;

    const res = response();

    test('Get All Students Success', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'getAllStudentsService')
        .mockResolvedValue(studentResults as any);
      await getAllStudents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(studentResults);
      spyGetStudents.mockRestore();
    });

    test('Get all students fail', async () => {
      const spyGetStudents = jest.spyOn(studentServices, 'getAllStudentsService').mockResolvedValue(null as any);
      await getAllStudents(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ err: 'students get failed' });
      spyGetStudents.mockRestore();
    });
  });

  describe('Update Student Test Case', () => {
    const alterStudent = {
      id: 1,
      name: 'stuname',
      gender: 'Male',
      address: 'newAddress1',
      mobile: '0123456789',
      birthday: '1998-12-10',
      age: '24',
    };

    const req1 = {
      body: {
        id: 1,
        name: 'stuname',
        address: 'newAddress123',
        mobileNo: '0123456459',
      },
    } as Request;

    const req2 = {
      body: {
        id: 1,
        name: '',
        address: 'newAddress123',
        mobileNo: '01256459',
      },
    } as Request;

    const res = response();

    test('Update Student Success', async () => {
      const spyUpdateStudent = jest.spyOn(studentServices, 'updateStudent').mockResolvedValue(alterStudent as any);
      await patchStudent(req1, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(alterStudent);
      spyUpdateStudent.mockRestore();
    });

    test('Update student fail', async () => {
      await patchStudent(req2, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ err: 'update failed' });
    });
  });

  describe('Delete Student Test Case', async () => {
    const deleteResult1 = {
      raw: [],
      affected: 1,
    };

    const deleteResult2 = {
      raw: [],
      affected: 0,
    };

    const req: any = {
      params: {
        Id: '1',
      },
    };
    const res = response();

    test('Delete Student Success', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteStudentService')
        .mockResolvedValue(deleteResult1 as any);
      await deleteStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Student deleted successfully' });
      spyDeleteStudent.mockRestore();
    });

    test('Delete Student Failed', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteStudentService')
        .mockResolvedValue(deleteResult2 as any);
      await deleteStudent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ err: 'Delete Failed' });
      spyDeleteStudent.mockRestore();
    });
  });
});
