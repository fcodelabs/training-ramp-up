/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
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

    const res_add = response();

    test('Add Student Success', async () => {
      const spyAddStudent = jest.spyOn(StudentService, 'addStudentService').mockResolvedValue(newStudent as Student);
      await addStudent(req_add, res_add);
      expect(res_add.status).toHaveBeenCalledWith(200);
      expect(res_add.send).toHaveBeenCalledWith(newStudent);
      spyAddStudent.mockRestore();
    });
    test('Add Student Fail', async () => {
      await addStudent(req_add_fail, res_add);
      expect(res_add.status).toHaveBeenCalledWith(400);
      expect(res_add.send).toHaveBeenCalledWith('Error in adding student');
    });
  });
  describe('Get Students Test', () => {
    const dummyStudents = [
      {
        id: 1,
        name: 'John',
        gender: 'Male',
        address: '123 Main St',
        mobile: '0789876543',
        birthday: new Date('1990-01-01'),
        age: 30,
      },
      {
        id: 2,
        name: 'David',
        gender: 'Male',
        address: '123 Main St',
        mobile: '0789876548',
        birthday: new Date('1991-01-01'),
        age: 29,
      },
    ] as Student[];

    const req_get = {} as Request;
    const res_get = response();

    test('Get Students Success', async () => {
      const spyGetStudents = jest.spyOn(StudentService, 'getStudentsService').mockResolvedValue(dummyStudents);
      await getStudents(req_get, res_get);
      expect(res_get.status).toHaveBeenCalledWith(200);
      expect(res_get.send).toHaveBeenCalledWith(dummyStudents);
      spyGetStudents.mockRestore();
    });
    test('Get Students Fail', async () => {
      await getStudents(req_get, res_get);
      expect(res_get.status).toHaveBeenCalledWith(400);
      expect(res_get.send).toHaveBeenCalledWith('Error in getting students');
    });
  });
  describe('Update Student Test', () => {
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
      await updateStudent(req_update, res_update);
      expect(res_update.status).toHaveBeenCalledWith(200);
      expect(res_update.send).toHaveBeenCalledWith('Student updated Successfully');
      spyUpdateStudent.mockRestore();
    });
    test('Update Student Fail', async () => {
      await updateStudent(req_update_fail, res_update);
      expect(res_update.status).toHaveBeenCalledWith(400);
      expect(res_update.send).toHaveBeenCalledWith('Error in updating student');
    });
  });
  describe('Delete Student Test', () => {
    const deleteResult = {
      raw: [],
      affected: 1,
    };
    const deleteResult_fail = {
      raw: [],
      affected: 0,
    };
    const req_delete = {
      params: {
        id: '2',
      },
    } as any;

    const req_delete_fail = {} as Request;

    const res_delete = response();

    test('Delete Student Success', async () => {
      const spyDeleteStudent = jest
        .spyOn(StudentService, 'deleteStudentService')
        .mockResolvedValue(deleteResult as any);
      await deleteStudent(req_delete, res_delete);
      expect(res_delete.status).toHaveBeenCalledWith(200);
      expect(res_delete.send).toHaveBeenCalledWith('Student deleted Successfully with name undefined');
      spyDeleteStudent.mockRestore();
    });
    test('Delete Student Fail', async () => {
      const spyDeleteStudent = jest
        .spyOn(StudentService, 'deleteStudentService')
        .mockResolvedValue(deleteResult_fail as any);
      await deleteStudent(req_delete_fail, res_delete);
      expect(res_delete.status).toHaveBeenCalledWith(400);
      expect(res_delete.send).toHaveBeenCalledWith('Error in deleting student');
      spyDeleteStudent.mockRestore();
    });
  });
});
