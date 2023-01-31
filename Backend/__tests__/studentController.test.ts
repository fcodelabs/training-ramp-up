/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { addStudent, getStudents, updateStudent, deleteStudent } from '../src/controllers/studentController';
import * as StudentService from '../src/services/studentServices';
import { Student } from '../src/models/studentModel';

describe('Student Controller Test', () => {
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Add Student Test', () => {
    let res: Response;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
      res = response();
      next = jest.fn();
    });
    const newStudent = {
      id: 1,
      name: 'John',
      gender: 'Male',
      address: '123 Main St',
      mobile: '0789876543',
      birthday: new Date('1990-01-01'),
      age: 30,
    } as Student;

    const req_add = {
      body: {
        name: 'John',
        gender: 'Male',
        address: '123 Main St',
        mobile: '0789876543',
        birthday: new Date('1990-01-01'),
        age: 30,
      },
    } as Request;

    const req_add_fail = {
      body: {
        name: 'John',
        gender: 'Male',
        address: '123 Main St',
        mobile: '0789876543',
        birthday: '1990-01-01', // Invalid Date format
        age: 30,
      },
    } as Request;

    it('should add a new student', async () => {
      const spy = jest.spyOn(StudentService, 'addStudentService').mockResolvedValue(newStudent as any);

      await addStudent(req_add, res, jest.fn());

      expect(spy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(newStudent);
    });

    it('should fail to add a new student', async () => {
      const error = new Error('Error in getting students');
      const spy = jest.spyOn(StudentService, 'getStudentsService').mockRejectedValue(error);

      await getStudents(req_add_fail as Request, res as Response, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Get Students Test', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
      req = {};
      res = response();
      next = jest.fn();
    });

    it('should return a list of students', async () => {
      const students = [
        {
          id: 1,
          name: 'John Doe',
          age: 20,
          mobile: '0712345678',
          address: 'hambantota',
          gender: 'Male',
          birthday: '1999-05-29',
        },
        {
          id: 2,
          name: 'Jane Doe',
          age: 22,
          mobile: '0712345678',
          address: 'hambantota',
          gender: 'Male',
          birthday: '1999-05-29',
        },
      ];
      const spy = jest.spyOn(StudentService, 'getStudentsService').mockResolvedValue(students as any);

      await getStudents(req as Request, res as Response, next);

      expect(spy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(students);
    });

    it('should call next with error if getStudentsService throws an error', async () => {
      const error = new Error('Error in getting students');
      const spy = jest.spyOn(StudentService, 'getStudentsService').mockRejectedValue(error);

      await getStudents(req as Request, res as Response, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Update Student Test', () => {
    let res: Response;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
      res = response();
      next = jest.fn();
    });
    const dummyStudent = {
      id: 2,
      name: 'David',
      gender: 'Male',
      address: '123 Main St',
      mobile: '0789876548',
      birthday: new Date('1991-01-01'),
      age: 29,
    } as Student;

    const req_update = {
      params: {
        id: '2',
      },
      body: {
        name: 'David',
        gender: 'Male',
        address: '123 Main St',
        mobile: '0789876548',
        birthday: new Date('1991-03-01'),
        age: 29,
      },
    } as any;

    const req_update_fail = {
      body: {
        id: 2,
        name: 'David',
        birthday: '1991-06-01', // Invalid Date format
      },
    } as Request;

    const res_update = response();

    test('Update Student Success', async () => {
      const spyUpdateStudent = jest.spyOn(StudentService, 'updateStudentService').mockResolvedValue(dummyStudent);
      await updateStudent(req_update, res_update, next);
      expect(res_update.status).toHaveBeenCalledWith(200);
      expect(res_update.send).toHaveBeenCalledWith('Student updated Successfully');
      spyUpdateStudent.mockRestore();
    });
    test('Update Student Fail', async () => {
      const error = new Error('Error in updating students');
      const spy = jest.spyOn(StudentService, 'getStudentsService').mockRejectedValue(error);

      await getStudents(req_update_fail as Request, res as Response, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe('Delete Student Test', () => {
    let res: Response;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
      res = response();
      next = jest.fn();
    });

    const deleteResult = {
      raw: [],
      affected: 1,
    };

    const req_delete = {
      params: {
        id: '2',
      },
    } as any;

    const req_delete_fail = {} as Request;

    test('Delete Student Success', async () => {
      const spyDeleteStudent = jest
        .spyOn(StudentService, 'deleteStudentService')
        .mockResolvedValue(deleteResult as any);
      await deleteStudent(req_delete, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Student deleted Successfully with name undefined');
      spyDeleteStudent.mockRestore();
    });

    test('Delete Student Fail', async () => {
      const error = new Error('Error in deleting students');
      const spy = jest.spyOn(StudentService, 'getStudentsService').mockRejectedValue(error);

      await getStudents(req_delete_fail as Request, res as Response, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
