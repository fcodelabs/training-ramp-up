/* eslint-disable @typescript-eslint/consistent-type-assertions */
import Student from '../entity/Student'
import StudentModel, { DeleteStudentModel, UpdateStudentModel } from '../models/studentModel'
import DatabaseService from '../services/DatabaseService'
import {
  getAllStudentsService,
  addStudentService,
  updateStudentService,
  deleteStudentService
} from '../services/StudentService'

describe('Student Services Test', () => {
  const allStudents = [
    {
      id: 1,
      name: 'newName1',
      gender: 'Male',
      address: 'newAddress1',
      mobileNo: '0112463256',
      dob: new Date('1999-10-10')
    }
  ] as StudentModel[]

  describe('Get all students service test', () => {
    test('Get all students success', async () => {
      DatabaseService.getRepository(Student).find = jest.fn().mockResolvedValue(allStudents)
      const result = await getAllStudentsService()
      expect(result).toEqual(allStudents)
    })
    test('Get all students fail', async () => {
      DatabaseService.getRepository(Student).find = jest.fn().mockRejectedValue(null)
      const result = await getAllStudentsService()
      expect(result).toEqual(null)
    })
  })

  describe('Add student service test', () => {
    const addNewStudent = {
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobileNo: '0112463268',
      dob: new Date('1997-11-15')
    } as StudentModel

    const addNewStudentResult = {
      id: 1,
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobileNo: '0112463268',
      dob: new Date('1997-11-15')
    } as StudentModel

    test('Add student success', async () => {
      DatabaseService.getRepository(Student).save = jest.fn().mockResolvedValue(addNewStudentResult)
      const result = await addStudentService(addNewStudent)
      expect(result).toEqual(addNewStudentResult)
    })
    test('Add student fail', async () => {
      DatabaseService.getRepository(Student).save = jest.fn().mockRejectedValue(null)
      const result = await addStudentService(addNewStudent)
      expect(result).toEqual(null)
    })
  })

  describe('Update student service test', () => {
    const findStudent = {
      id: 1,
      name: 'userName',
      gender: 'Male',
      address: 'userAddress1',
      mobileNo: '0112463256',
      dob: new Date('1999-10-10')
    } as StudentModel

    const changesStudent = {
      id: 1,
      address: 'UpdateAddress1'
    } as UpdateStudentModel

    const updatedStudent = {
      id: 1,
      name: 'userName',
      gender: 'Male',
      address: 'UpdateAddress1',
      mobileNo: '0112463256',
      dob: new Date('1999-10-10')
    } as StudentModel

    test('Update student success', async () => {
      DatabaseService.getRepository(Student).findOneBy = jest.fn().mockResolvedValue(findStudent)
      DatabaseService.getRepository(Student).merge = jest.fn().mockResolvedValue(updatedStudent)
      DatabaseService.getRepository(Student).save = jest.fn().mockResolvedValue(updatedStudent)
      const result = await updateStudentService(changesStudent)
      expect(result).toEqual(updatedStudent)
    })
    test('Update student fail', async () => {
      DatabaseService.getRepository(Student).findOneBy = jest.fn().mockResolvedValue(null)
      // DatabaseService.getRepository(Student).save = jest.fn().mockResolvedValue(updatedStudent)
      const result = await updateStudentService(changesStudent)
      expect(result).toEqual(null)
    })
  })

  describe('Delete student service test', () => {
    const deleteResult = {
      raw: [],
      affected: 1
    } as DeleteStudentModel

    const id = 1

    test('Delete student success', async () => {
      DatabaseService.getRepository(Student).delete = jest.fn().mockResolvedValue(deleteResult)
      const res = await deleteStudentService(id)
      expect(res).toEqual(deleteResult)
    })
    test('Delete student fail', async () => {
      DatabaseService.getRepository(Student).delete = jest.fn().mockRejectedValue(null)
      const res = await deleteStudentService(id)
      expect(res).toEqual(null)
    })
  })
})
