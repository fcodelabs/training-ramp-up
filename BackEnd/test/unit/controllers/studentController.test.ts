import { getAllStudents, addStudent, updateStudent, deleteStudent } from '../../../src/controllers/studentController'
import { Student } from '../../../src/models/StudentModel'
import { Request, Response, NextFunction } from 'express'
import * as studentServices from '../../../src/services/studentServices'

describe('Student Controller tests', () => {
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


  describe('Get All Students Test', () => {
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

      const spyGetAllStudents = jest
        .spyOn(studentServices, 'getStudents')
        .mockResolvedValue(students)
      await getAllStudents(req, res, next)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(students)
      expect(res.status).toBeCalledTimes(1)
      expect(spyGetAllStudents).toBeCalledTimes(1)
      spyGetAllStudents.mockRestore()
    })

    test('should return error', async () => {
      const spyGetAllStudents = jest
        .spyOn(studentServices, 'getStudents')
        .mockRejectedValue(new Error('Error'))
      await getAllStudents(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('Error'))
      expect(spyGetAllStudents).toBeCalledTimes(1)
      spyGetAllStudents.mockRestore()
    })
  })

  describe('Add new Student Test', () => {
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
    test('should add a new student', async() => {

      const spyAddStudent = jest
        .spyOn(studentServices, 'addNewStudent')
        .mockResolvedValue(student1)
      await addStudent(req, res, next)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(student1)
      expect(res.status).toBeCalledTimes(1)
      expect(spyAddStudent).toBeCalledTimes(1)
      spyAddStudent.mockRestore()
    })

    test('should return error', async () => {
      const spyAddStudent = jest
        .spyOn(studentServices, 'addNewStudent')
        .mockRejectedValue(new Error('Error'))
      await addStudent(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('Error'))
      expect(spyAddStudent).toBeCalledTimes(1)
      spyAddStudent.mockRestore()
    })
  })
  
  describe('Update Student Test', () => {
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

    test('should update a student', async() => {
      const spyUpdateStudent = jest
        .spyOn(studentServices, 'updateSelectedStudent')
        .mockResolvedValue(student2)
      await updateStudent(req, res, next)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(student2)
      expect(res.status).toBeCalledTimes(1)
      expect(spyUpdateStudent).toBeCalledTimes(1)
      spyUpdateStudent.mockRestore()
    })

    test('should return error', async () => {
      const spyUpdateStudent = jest
        .spyOn(studentServices, 'updateSelectedStudent')
        .mockRejectedValue(new Error('Error'))
      await updateStudent(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('Error'))
      expect(spyUpdateStudent).toBeCalledTimes(1)
      spyUpdateStudent.mockRestore()
    })

  })

  describe('Delete Student Test', () => {
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

    test('should delete a student', async() => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteSelectedStudent')
        .mockResolvedValue(student3)
      await deleteStudent(req, res, next)
      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.status).toBeCalledTimes(1)
      expect(spyDeleteStudent).toBeCalledTimes(1)
      spyDeleteStudent.mockRestore()
    })

    test('should return error', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteSelectedStudent')
        .mockRejectedValue(new Error('Error'))
      await deleteStudent(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('Error'))
      expect(spyDeleteStudent).toBeCalledTimes(1)
      spyDeleteStudent.mockRestore()
    })

  })

})

