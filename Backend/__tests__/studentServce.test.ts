/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '../src/models/studentModel';
import { appDataSource } from '../src/configs/dataSourceConfig';
import * as StudentService from '../src/services/studentServices';

describe('Student Service Test', () => {
  const student = {
    name: 'student',
    address: 'address',
    age: 20,
    birthday: new Date('1999-01-01'),
    gender: 'Male',
    mobile: '0784567890',
  } as Student;

  const studentCreated = {
    id: 1,
    name: 'student',
    address: 'address',
    age: 20,
    birthday: new Date('1999-01-01'),
    gender: 'Male',
    mobile: '0784567890',
  } as Student;

  const studentUpdated = {
    id: 1,
    name: 'student',
    address: 'new_address',
    age: 20,
    birthday: new Date('1999-01-01'),
    gender: 'Male',
    mobile: '0784567890',
  } as Student;

  const studentDeleted = {
    id: 1,
    name: 'student',
    address: 'address',
    age: 20,
    birthday: new Date('1999-01-01'),
    gender: 'Male',
    mobile: '0784567890',
  } as Student;

  const studentList = [
    {
      id: 1,
      name: 'student',
      address: 'address',
      age: 20,
      birthday: new Date('1999-01-01'),
      gender: 'Male',
      mobile: '0784567890',
    },
    {
      id: 2,
      name: 'student2',
      address: 'address2',
      age: 20,
      birthday: new Date('1999-01-01'),
      gender: 'Male',
      mobile: '0784567891',
    },
  ] as Student[];

  describe('addStudentService', () => {
    it('should add student', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'save').mockResolvedValue(studentCreated);
      const res = await StudentService.addStudentService(student);
      expect(spy).toBeCalledTimes(1);
      expect(res).toEqual(studentCreated);
      spy.mockRestore();
    });

    it('should throw error', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'save').mockRejectedValue(new Error('Error in adding student'));
      await expect(StudentService.addStudentService(student)).rejects.toThrowError('Error in adding student');
      spy.mockRestore();
    });
  });

  describe('getStudentsService', () => {
    it('should get students', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'find').mockResolvedValue(studentList);
      const res = await StudentService.getStudentsService();
      expect(spy).toBeCalledTimes(1);
      expect(res).toEqual(studentList);
      spy.mockRestore();
    });

    it('should throw error', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'find').mockRejectedValue(new Error('Error in getting students'));
      await expect(StudentService.getStudentsService()).rejects.toThrowError('Error in getting students');
      spy.mockRestore();
    });
  });

  describe('deleteStudentService', () => {
    it('should delete student', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spyDeletedStudent = jest.spyOn(studentRepo, 'findOne').mockResolvedValue(studentDeleted);
      const spyDelete = jest.spyOn(studentRepo, 'delete').mockResolvedValue(studentDeleted as any);
      const res = await StudentService.deleteStudentService(1);
      expect(res).toEqual(studentDeleted);
      spyDelete.mockRestore();
      spyDeletedStudent.mockRestore();
    });

    it('should throw error', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spyDeletedStudent = jest.spyOn(studentRepo, 'findOne').mockResolvedValue(studentDeleted);
      const spyDelete = jest.spyOn(studentRepo, 'delete').mockRejectedValue(new Error('Error in deleting student'));
      await expect(StudentService.deleteStudentService(1)).rejects.toThrowError('Error in deleting student');
      spyDelete.mockRestore();
      spyDeletedStudent.mockRestore();
    });
  });

  describe('updateStudentService', () => {
    it('should update student', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'update').mockResolvedValue(studentUpdated as any);
      const res = await StudentService.updateStudentService(1, studentUpdated);
      expect(spy).toBeCalledTimes(1);
      expect(res).toEqual(studentUpdated);
      spy.mockRestore();
    });

    it('should throw error', async () => {
      const studentRepo = appDataSource.getRepository(Student);
      const spy = jest.spyOn(studentRepo, 'update').mockRejectedValue(new Error('Error in updating student'));
      await expect(StudentService.updateStudentService(1, studentUpdated)).rejects.toThrowError(
        'Error in updating student'
      );
      spy.mockRestore();
    });
  });
});
