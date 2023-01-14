/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import * as studentServices from '../services/StudentService'
import { getAllStudents, addStudent, updateStudent, deleteStudent } from '../controllers/StudentController'
import { DeleteStudentModel } from '../models/studentModel'
import Student from '../entity/Student'

describe('Student Controllers Test', () => {
  const response = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
  }
  describe('Get all students controller test', () => {
    const studentsresult = [
      {
        id: 1,
        name: 'newName1',
        gender: 'Male',
        address: 'newAddress1',
        mobileNo: '0112463256',
        dob: new Date('1999-10-10')
      }
    ] as Student[]

    const req = {} as Request

    const res = response()

    test('Get all students success', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'getAllStudentsService')
        .mockResolvedValue(studentsresult)
      await getAllStudents(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(studentsresult)
      spyGetStudents.mockRestore()
    })
    test('Get all students fail', async () => {
      const spyGetStudents = jest
        .spyOn(studentServices, 'getAllStudentsService')
        .mockResolvedValue(null)
      await getAllStudents(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Could not get student details')
      spyGetStudents.mockRestore()
    })
  })

  describe('Add student controller test', () => {
    const newStudent = {
      id: 1,
      name: 'stuname',
      gender: 'Male',
      address: 'newAddress1',
      mobileNo: '0123456789',
      dob: new Date('1998-12-10')
    } as Student

    const req1 = {
      body: {
        name: 'stuname',
        gender: 'Male',
        address: 'newAddress1',
        mobileNo: '0123456789',
        dob: '1998-12-10'
      }
    } as Request

    const req2 = {
      body: {
        name: 'stuname',
        gender: 'Male',
        address: 'newAddress1',
        mobileNo: '01234569',
        dob: '1998-12-10'
      }
    } as Request

    const res = response()

    test('Add student success', async () => {
      const spyAddStudent = jest
        .spyOn(studentServices, 'addStudentService')
        .mockResolvedValue(newStudent)
      await addStudent(req1, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith(newStudent)
      spyAddStudent.mockRestore()
    })
    test('Add student fail', async () => {
      // const spyAddStudent = jest
      //   .spyOn(studentServices, 'addStudentService')
      //   .mockResolvedValue(null)
      await addStudent(req2, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not add student. Enter Valid Data')
      // spyAddStudent.mockRestore()
    })
  })

  describe('Update student controller test', () => {
    const alterStudent = {
      id: 1,
      name: 'stuname',
      gender: 'Male',
      address: 'newAddress1',
      mobileNo: '0123456789',
      dob: new Date('1998-12-10')
    } as Student

    const req1 = {
      body: {
        id: 1,
        name: 'stuname',
        address: 'newAddress123',
        mobileNo: '0123456459'
      }
    } as Request

    const req2 = {
      body: {
        id: 1,
        name: '',
        address: 'newAddress123',
        mobileNo: '01256459'
      }
    } as Request

    const res = response()

    test('Update student success', async () => {
      const spyUpdateStudent = jest
        .spyOn(studentServices, 'updateStudentService')
        .mockResolvedValue(alterStudent)
      await updateStudent(req1, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(alterStudent)
      spyUpdateStudent.mockRestore()
    })
    test('Update student fail', async () => {
      await updateStudent(req2, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not update student. Enter Valid Data')
    })
  })

  describe('Delete student controller test', () => {
    const deleteResult1 = {
      raw: [],
      affected: 1
    } as DeleteStudentModel

    const deleteResult2 = {
      raw: [],
      affected: 0
    } as DeleteStudentModel

    const req: any = {
      params: {
        Id: '1'
      }
    }

    const res = response()

    test('Delete student success', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteStudentService')
        .mockResolvedValue(deleteResult1)
      await deleteStudent(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(deleteResult1)
      spyDeleteStudent.mockRestore()
    })
    test('Delete student fail', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentServices, 'deleteStudentService')
        .mockResolvedValue(deleteResult2)
      await deleteStudent(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Could not found student to delete')
      spyDeleteStudent.mockRestore()
    })
  })
})
