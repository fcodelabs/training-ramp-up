import { Student } from '../entity/Student';
import {
  deleteStudent,
  getStudents,
  updateStudent,
  postStudent,
} from './studentService';

describe('Student Service Unit test cases', () => {
  describe('Get All Students unit Test', () => {
    const studentDetails = [
      {
        name: 'name',
        gender: 'gender',
        address: 'address',
        mobile_number: '1122334455',
        date: new Date('1996-07-09 12:00:00'),
        age: 26,
      },
    ];
    const body = [
      {
        name: 'name',
        gender: 'gender',
        address: 'address',
        mobile_number: '1122334455',
        date: new Date('1996-07-09 12:00:00'),
        age: 26,
      },
    ];
    test('Success get All Student  unit Test', async () => {
      Student.find = jest.fn().mockResolvedValue(studentDetails);
      const res = await getStudents();
      expect(res).toEqual(body);
    });
  });
  test('fail Get Student  unit Test', async () => {
    Student.find = jest.fn().mockRejectedValue(null);
    const res = await getStudents();
    expect(res).toEqual({
      msg: 'get student failed',
    });
  });
  describe('delete Student  unit Test', () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const studentId = 1;
    test('Success delete Student  unit Test', async () => {
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
  describe('update student  unit Test', () => {
    const student = {
      name: 'name',
      gender: 'Male',
      address: 'testAddress',
      mobile_number: '123456789',
      date: new Date('2001-04-05 00:00:00'),
      age: 21,
      id: 1,
    };
    const request = {
      params: {
        name: 'name',
        gender: 'gender',
        address: 'address',
        mobile_number: '1122334455',
        date: new Date('1996-07-09 12:00:00'),
        age: 26,
        studentId: '1',
      },
    };
    const studentMove = {
      id: 1,
      name: 'name',
      gender: 'gender',
      address: 'address',
      mobile_number: '1122334455',
      date: new Date('1996-07-09 12:00:00'),
      age: 26,
    };
    test('update Students list  unit Test', async () => {
      Student.findOne = jest.fn().mockResolvedValue(student);
      Student.merge = jest.fn().mockResolvedValue(studentMove);
      Student.save = jest.fn().mockResolvedValue(studentMove);
      const res = await updateStudent(request);
      expect(res).toEqual(studentMove);
    });
    test('update failed  unit Test', async () => {
      Student.findOne = jest.fn().mockResolvedValue(null);
      Student.merge = jest.fn().mockResolvedValue(null);
      Student.save = jest.fn().mockResolvedValue(null);
      const res = await updateStudent(request);
      expect(res).toEqual(null);
    });
  });
  describe('Student  Add  unit Test', () => {
    const request = {
      name: 'name',
      gender: 'gender',
      address: 'address',
      mobile_number: '1122334455',
      date: new Date('2012-10-25 12:00:00'),
      age: 26,
    };
    const student = {
      name: 'name',
      gender: 'gender',
      address: 'address',
      mobile_number: '1122334455',
      date: new Date('2012-10-25 12:00:00'),
      age: 26,
      id: 1,
    } as never;
    test('Add Student Success Unit Test', async () => {
      jest.spyOn(Student, 'save').mockResolvedValue(student);
      const res = await postStudent(request);
      expect(res).toEqual(student);
    });
    test('Add Student Fail Unit Test', async () => {
      jest.spyOn(Student, 'save').mockResolvedValue(null);
      const res = await postStudent(request);
      expect(res).toEqual(null);
    });
  });
});
