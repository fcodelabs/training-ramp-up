/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AuthModule } from '../auth/auth.module';
import { DeleteResult } from 'typeorm';
import Student from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { AppGateway } from '../app.gateway';

describe('Student Controller Test', () => {  
  let studentsController: StudentsController;
  let studentsService: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [StudentsController],
      providers: [AppGateway,
        {
        provide: StudentsService,
        useValue: {
          getAllStudentsService: jest.fn((x) => x),
          addStudentService: jest.fn((x) => x),
          updateStudentService: jest.fn((x) => x),
          deleteStudentService: jest.fn((x) => x),
        },
      },],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
    studentsController = module.get<StudentsController>(StudentsController);
  });

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

    const res = response()

    it('Get all students success', async () => {
      const spyGetStudents = jest
        .spyOn(studentsService, 'getAllStudentsService')
        .mockResolvedValue(studentsresult)
      await studentsController.getAllStudents(res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(studentsresult)
      spyGetStudents.mockRestore()
    })
    it('Get all students fail', async () => {
      const spyGetStudents = jest
        .spyOn(studentsService, 'getAllStudentsService')
        .mockResolvedValue(null)
      await studentsController.getAllStudents(res)
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

    it('Add student success', async () => {
      const spyAddStudent = jest
        .spyOn(studentsService, 'addStudentService')
        .mockResolvedValue(newStudent)
      await studentsController.addStudent(req1.body, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith(newStudent)
      spyAddStudent.mockRestore()
    })
    it('Add student fail with null', async () => {
      const spyAddStudent = jest
        .spyOn(studentsService, 'addStudentService')
        .mockResolvedValue(null)
      await studentsController.addStudent(req1.body, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Could not add student')
      spyAddStudent.mockRestore()
    })
    it('Add student fail', async () => {
      await studentsController.addStudent(req2.body, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not add student. Enter Valid Data')
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

    it('Update student success', async () => {
      const spyUpdateStudent = jest
        .spyOn(studentsService, 'updateStudentService')
        .mockResolvedValue(alterStudent)
      await studentsController.updateStudent(req1.body, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(alterStudent)
      spyUpdateStudent.mockRestore()
    })
    it('Update student fail', async () => {
      await studentsController.updateStudent(req2.body, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not update student. Enter Valid Data')
    })
  })

  describe('Delete student controller test', () => {
    const deleteResult1 = {
      raw: [],
      affected: 1
    } as DeleteResult

    const deleteResult2 = {
      raw: [],
      affected: 0
    } as DeleteResult

    const req: any = {
      params: {
        Id: '1'
      }
    }

    const res = response()

    it('Delete student success', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentsService, 'deleteStudentService')
        .mockResolvedValue(deleteResult1)
      await studentsController.deleteStudent(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(deleteResult1)
      spyDeleteStudent.mockRestore()
    })
    it('Delete student fail', async () => {
      const spyDeleteStudent = jest
        .spyOn(studentsService, 'deleteStudentService')
        .mockResolvedValue(deleteResult2)
      await studentsController.deleteStudent(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Could not found student to delete')
      spyDeleteStudent.mockRestore()
    })
  })
});