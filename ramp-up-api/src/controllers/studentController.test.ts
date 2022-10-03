import { Student } from '../entity/Student';
import {
  deleteStudent,
  allStudent,
  addStudent,
  updateStudent,
} from './studentController';
const bcrypt = require('bcrypt');
describe('Student Controll', () => {
  describe('Student List', () => {
    const studentDetails = [
      {
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: 21,
      },
    ];

    const body = {
      student: [
        {
          name: 'test',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: 21,
        },
      ],
    };

    const response = {
      // status: jest.fn((x) => x),
      json: jest.fn((x) => x),
    };
    const request = {};

    test('get Student', async () => {
      Student.find = jest.fn().mockReturnValue(studentDetails);
      await allStudent(request, response);
      expect(response.json).toHaveBeenCalledWith(body);
    });

    test('fail Get Student', async () => {
      Student.find = jest.fn().mockRejectedValue(null);
      await allStudent(request, response);
      //expect(response.status).toEqual(400);
      expect(response.json).toHaveBeenCalledWith({
        error: 'students not found',
      });
    });
  });

  describe('delete student', () => {
    const studentID = 1;

    const request = {
      params: {
        id: 1,
      },
    };

    const response = {
      json: jest.fn(),
    };

    test('delete success', async () => {
      Student.delete = jest.fn().mockResolvedValue(studentID);
      const res = await deleteStudent(request, response);
      expect(res).toEqual(studentID);
    });

    test('delete failed', async () => {
      Student.delete = jest.fn().mockReturnValue(null);
      const res = await deleteStudent(request, response);
      expect(res).toEqual(null);
    });
  });

  describe('update student', () => {
    const student = {
      name: 'test',
      gender: 'Male',
      address: 'testAddress',
      mobileNo: '123456789',
      birth: new Date('2001-04-05 00:00:00'),
      age: 21,
    };
    const request = {
      params: {
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: 21,
        studentId: 1,
      },
    };

    const studentChange = {
      id: 1,
      name: 'testName',
      gender: 'Male',
      address: 'testAddress',
      mobileNo: '123456789',
      birth: new Date('2001-04-05 00:00:00'),
      age: 21,
    };

    const response = {
      json: jest.fn((x) => x),
    };

    test('update Student', async () => {
      Student.findOne = jest.fn().mockRejectedValue(student);
      Student.merge = jest.fn().mockRejectedValue(studentChange);
      Student.save = jest.fn().mockRejectedValue(studentChange);
      const res = await updateStudent(request, response);
      expect(res).toEqual(studentChange);
    });

    test('update failed', async () => {
      Student.findOne = jest.fn().mockResolvedValue(null);
      Student.merge = jest.fn().mockResolvedValue(null);
      Student.save = jest.fn().mockResolvedValue(null);
      const res = await updateStudent(request, response);
      expect(res).toEqual(null);
    });
  });

  describe('Add Student', () => {
    const request = {
      body: {
        name: 'test',
        gender: 'Male',
        address: 'test Address',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: 21,
      },
    };

    const studentData = {
      name: 'test',
      gender: 'Male',
      address: 'test Address',
      mobileNo: '123456789',
      birth: new Date('2001-04-05 00:00:00'),
      age: 21,
    };

    const response = {
      json: jest.fn((x) => x),
    };

    test('Add Student Success', async () => {
      Student.create = jest.fn().mockResolvedValue(studentData);
      // const spyStudent = jest
      //   .spyOn(student, 'save')
      //   .mockResolvedValue(studentData);
      const mockHash = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const res = await addStudent(request, response);
      expect(res).toEqual(studentData);
      mockHash.mockRestore();
    });

    test('Add Student fails', async () => {
      Student.create = jest.fn().mockResolvedValue(null);
      const res = await addStudent(request, response);
      expect(res).toEqual({ error: 'Student Add fails' });
    });
  });
});
