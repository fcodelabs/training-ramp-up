import { Student } from '../models/StudentModel'
import { Request, Response, NextFunction } from 'express'
import {
  getStudents,
  addNewStudent,
  updateSelectedStudent,
  deleteSelectedStudent,
} from './studentServices'
import { PostgresDataSource } from '../configs/db'

describe('Student Services Tests', () => {
  const student1 = {
    id: 1,
    name: 'John',
    gender: 'male',
    address: '123 Main St',
    mobile: '1234567890',
    dob: new Date('1990-01-01'),
    age: 30,
  } as Student

  const student2 = {
    id: 2,
    name: 'Jane',
    gender: 'female',
    address: '123 Main St',
    mobile: '1234567890',
    dob: new Date('1990-01-01'),
    age: 30,
  } as Student

  const student3 = {
    id: 3,
    name: 'Jack',
    gender: 'male',
    address: '123 Main St',
    mobile: '1234567890',
    dob: new Date('1990-01-01'),
    age: 30,
  } as Student

  const students: Student[] = [student1, student2, student3]

  beforeEach(() => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        name: 'John',
        gender: 'male',
        address: 'asdfasdf',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      },
    } as unknown as Request
    })

  describe('Get All students service', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        name: 'John',
        gender: 'male',
        address: 'asdfasdf',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      },
    } as unknown as Request

    test('should return all students', async () => {
      const spyGetAllStudents = jest.spyOn(Student, 'find').mockResolvedValue(students)
      const result = await getStudents(req, res, next)
      expect(result).toEqual(students)
      expect(spyGetAllStudents).toHaveBeenCalled()
      expect(spyGetAllStudents).toHaveBeenCalledTimes(1)
    })

    test('should call next with an error if it fails to get students', async () => {
        const error = new Error('Failed to get students');
        (Student.find as jest.Mock).mockRejectedValue(error);

        await getStudents(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.json).not.toHaveBeenCalled();
    });
  })

  describe('Add New Student Service', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        name: 'John',
        gender: 'male',
        address: 'asdfasdf',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      },
    } as unknown as Request

    test('should save a new student to the database', async () => {
        const spyAddNewStudent = jest.spyOn(PostgresDataSource.manager, 'save').mockResolvedValue(student1)
        const result = await addNewStudent(req, res, next)
        expect(result).toEqual(student1)
        expect(spyAddNewStudent).toHaveBeenCalled()
        expect(spyAddNewStudent).toHaveBeenCalledTimes(1)
      });
    
      test ('should call next with an error if it fails to save a new student', async () => {
        const error = new Error('Failed to save new student');
        (PostgresDataSource.manager.save as jest.Mock).mockRejectedValue(error);
    
        await addNewStudent(req, res, next);
    
        expect(next).toHaveBeenCalledWith(error);
        expect(res.json).not.toHaveBeenCalled();
      });
      
})

    describe('Update Selected Student Service', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
        params: {
            id: "1"
        },
      body: {
        name: 'John',
        gender: 'male',
        address: 'asdfasdf',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30
      },
    } as unknown as Request
    
    test('should update a student in the database', async () => {
        jest.spyOn(PostgresDataSource.getRepository(Student), 'findOneBy').mockResolvedValue(student2)
        jest.spyOn(PostgresDataSource.getRepository(Student), 'save').mockResolvedValue(student2)
        const result = await updateSelectedStudent(req, res, next)
        expect(result).toBe(student2)
      });

      test('should call next with an error if it fails to update a student', async () => {
        const error = new Error('Failed to update student');
        (PostgresDataSource.getRepository(Student).findOneBy as jest.Mock).mockRejectedValue(error);
        
        await updateSelectedStudent(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.json).not.toHaveBeenCalled();
        });
      
    })


    describe('Delete Selected Student Service', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
        params: {
            id: "1"
        },
      body: {
        name: 'John',
        gender: 'male',
        address: 'asdfasdf',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      },
    } as unknown as Request

    test('should delete a student from the database', async () => {
        jest.spyOn(PostgresDataSource.getRepository(Student), 'findOneBy').mockResolvedValue(student3)
        jest.spyOn(PostgresDataSource.getRepository(Student), 'remove').mockResolvedValue(student3)
        const result = await deleteSelectedStudent(req, res, next)
        expect(result).toBe(student3)
        // expect(spyDeleteSelectedStudent).toHaveBeenCalled()
        // expect(spyDeleteSelectedStudent).toHaveBeenCalledTimes(1)
      });
        
      test('should call next with an error if it fails to delete a student', async () => {
        const error = new Error('Failed to delete student');
        (PostgresDataSource.getRepository(Student).remove as jest.Mock).mockRejectedValue(error);
    
        await deleteSelectedStudent(req, res, next);
    
        expect(next).toHaveBeenCalledWith(error);
        expect(res.json).not.toHaveBeenCalled();
      });

    })


})
