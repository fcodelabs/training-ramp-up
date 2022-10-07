import { Student } from '../entity/Student';
import {
  deleteStudent,
  getStudents,
  updateStudent,
  postStudent,
} from './studentService';

describe('Student Service Unit test cases', () => {
  describe('Get All Students', () => {
    const studentDetails = [
      {
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      },
    ];

    const body = [
      {
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      },
    ];

    test('Success get All Student', async () => {
      Student.find = jest.fn().mockResolvedValue(studentDetails);
      const res = await getStudents();
      expect(res).toEqual(body);
    });
  });
  test('fail Get Student', async () => {
    Student.find = jest.fn().mockRejectedValue(null);
    const res = await getStudents();
    expect(res).toEqual({
      msg: 'get student failed',
    });
  });

  describe('delete Student', () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const studentId = 1;

    test('Success delete Student', async () => {
      Student.delete = jest.fn().mockResolvedValue(studentId);
      const res = await deleteStudent(req);
      expect(res).toEqual(studentId);
    });

    test('Fail delete student', async () => {
      Student.delete = jest.fn().mockResolvedValue(null);
      const res = await deleteStudent(req);
      expect(res).toEqual(null);
    });
  });

  describe('update student', () => {
    const student = {
      name: 'test',
      gender: 'Male',
      address: 'testAddress',
      mobile_number: '123456789',
      date: new Date('2001-04-05 00:00:00'),
      age: 21,
      id: 1,
    };
    const request = {
      params: {
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
        studentId: 1,
      },
    };

    const studentChange = {
      id: 1,
      name: 'testName',
      gender: 'Male',
      address: 'testAddress',
      mobile_number: '123456789',
      date: new Date('2001-04-05 00:00:00'),
      age: 21,
    };

    test('update Students list', async () => {
      Student.findOne = jest.fn().mockRejectedValue(student);
      Student.merge = jest.fn().mockRejectedValue(studentChange);
      Student.save = jest.fn().mockRejectedValue(studentChange);
      const res = await updateStudent(request);
      console.log('RES', res);
      expect(res).toEqual(studentChange);
    });

    test('update failed', async () => {
      Student.findOne = jest.fn().mockResolvedValue(null);
      Student.merge = jest.fn().mockResolvedValue(null);
      Student.save = jest.fn().mockResolvedValue(null);
      const res = await updateStudent(request);
      expect(res).toEqual(null);
    });
  });

  // describe('User Add', async () => {
  //   const request = {
  //     name: 'test',
  //     gender: 'Male',
  //     address: 'test address',
  //     mobile_number: '0123456789',
  //     birth: new Date('2001-04-05 00:00:00'),
  //     age: 20,
  //   };

  //   const student = {
  //     name: 'test',
  //     gender: 'Male',
  //     address: 'test address',
  //     mobile_number: '0123456789',
  //     birth: new Date('2001-04-05 00:00:00'),
  //     age: 20,
  //     id: 1,
  //   };

  //   test('Add Student Success', async () => {
  //     Student.create = jest.fn().mockResolvedValue(request);
  //     // const studentSave = jest.spyOn(student , "save").mockResolvedValue(student);
  //     const res = await addOne(request);
  //     expect(res).toEqual(student);
  //   });

  //   test('Add Student Fail', async () => {
  //     Student.create = jest.fn().mockResolvedValue(null);
  //     const res = await addOne(request);
  //     expect(res).toEqual({ error: 'student add error' });
  //   });
  // });
});
