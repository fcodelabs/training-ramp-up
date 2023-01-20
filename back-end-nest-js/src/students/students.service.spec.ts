/* eslint-disable prettier/prettier */
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import Student from './entities/students.entity';
import { StudentsService } from './students.service';
import { StudentInterface, UpdateStudentInterface } from './interfaces/students.interface';

describe('Students Service Test', () => {
  let studentsService: StudentsService;
  let studentRepository: Repository<Student>;

  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [StudentsService,
          {
            provide: STUDENT_REPOSITORY_TOKEN,
            useValue: {
              find: jest.fn(),
              save: jest.fn(),
              findOneBy: jest.fn(),
              merge: jest.fn(),
              delete: jest.fn(),
            },
          },],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(STUDENT_REPOSITORY_TOKEN);
  });

  describe('Get all students service test', () => {
    const allStudents = [
      {
        id: 1,
        name: 'newName1',
        gender: 'Male',
        address: 'newAddress1',
        mobileNo: '0112463256',
        dob: new Date('1999-10-10')
      }
    ] as Student[]

    it('Get all students success', async () => {
      studentRepository.find = jest.fn().mockResolvedValue(allStudents)
      const result = await studentsService.getAllStudentsService()
      expect(result).toEqual(allStudents)
    })
    it('Get all students fail', async () => {
      studentRepository.find = jest.fn().mockRejectedValue(null)
      const result = await studentsService.getAllStudentsService()
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
    } as StudentInterface

    const addNewStudentResult = {
      id: 1,
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobileNo: '0112463268',
      dob: new Date('1997-11-15')
    } as Student

    it('Add student success', async () => {
      studentRepository.save = jest.fn().mockResolvedValue(addNewStudentResult)
      const result = await studentsService.addStudentService(addNewStudent)
      expect(result).toEqual(addNewStudentResult)
    })
    // it('Add student fail', async () => {
    //   studentRepository.save = jest.fn().mockRejectedValue(null)
    //   const result = await studentsService.addStudentService(addNewStudent)
    //   expect(result).toEqual(null)
    // })
  })

  describe('Update student service test', () => {
    const findStudent = {
      id: 1,
      name: 'userName',
      gender: 'Male',
      address: 'userAddress1',
      mobileNo: '0112463256',
      dob: new Date('1999-10-10')
    } as Student

    const changesStudent = {
      id: 1,
      address: 'UpdateAddress1'
    } as UpdateStudentInterface

    const updatedStudent = {
      id: 1,
      name: 'userName',
      gender: 'Male',
      address: 'UpdateAddress1',
      mobileNo: '0112463256',
      dob: new Date('1999-10-10')
    } as Student

    it('Update student success', async () => {
      studentRepository.findOneBy = jest.fn().mockResolvedValue(findStudent)
      studentRepository.merge = jest.fn().mockResolvedValue(updatedStudent)
      studentRepository.save = jest.fn().mockResolvedValue(updatedStudent)
      const result = await studentsService.updateStudentService(changesStudent)
      expect(result).toEqual(updatedStudent)
    })
    it('Update student fail', async () => {
      studentRepository.findOneBy = jest.fn().mockResolvedValue(null)
      const result = await studentsService.updateStudentService(changesStudent)
      expect(result).toEqual(null)
    })
  })

  describe('Delete student service test', () => {
    const deleteResult = {
      raw: [],
      affected: 1
    } as DeleteResult

    const id = 1

    it('Delete student success', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue(deleteResult)
      const res = await studentsService.deleteStudentService(id)
      expect(res).toEqual(deleteResult)
    })
    it('Delete student fail', async () => {
      studentRepository.delete = jest.fn().mockRejectedValue(null)
      const res = await studentsService.deleteStudentService(id)
      expect(res).toEqual(null)
    })
  })
});