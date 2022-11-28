import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';
import { StudentController } from '../student.controller';
import { GetStudentsType } from '../interfaces/student.interface';
import { StudentService } from '../student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const reqMock = {
    body: {},
    params: {},
  } as Request;

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: 'STUDENT_SERVICE',
          useValue: {
            getAllStudentService: jest.fn((x) => x),
            createStudentService: jest.fn((x) => x),
            updateStudentService: jest.fn((x) => x),
            deleteStudentService: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>('STUDENT_SERVICE');
    controller = module.get<StudentController>(StudentController);
  });

  it('should be defind Student Controller and service', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getStudents', () => {
    const allStudents = {
      students: [
        {
          id: 1,
          name: 'newName1',
          gender: 'Male',
          address: 'newAddress1',
          mobile: 112463256,
          birthday: '1999-10-10',
          age: 23,
        },
      ],
    } as GetStudentsType;

    const resMock = mockResponse();

    it('should return all students', async () => {
      jest
        .spyOn(service, 'getAllStudentService')
        .mockResolvedValue(allStudents);
      await controller.getAllStudents(resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(allStudents);
    });

    it('should return an error', async () => {
      jest
        .spyOn(service, 'getAllStudentService')
        .mockRejectedValue({ err: 'Students are not Found' });
      await controller.getAllStudents(resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('addStudent', () => {
    const newStudent = {
      id: 1,
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobile: 112463268,
      birthday: '1997-11-15',
      age: 25,
    };

    reqMock.body = {
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobile: '0112463268',
      birthday: '1997-11-15',
      age: 25,
    };

    const resMock = mockResponse();

    it('add new student', async () => {
      jest.spyOn(service, 'createStudentService').mockResolvedValue(newStudent);
      await controller.addStudent(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(newStudent);
    });

    it('fail add new student', async () => {
      jest
        .spyOn(service, 'createStudentService')
        .mockRejectedValue({ err: 'Students are not Found' });
      await controller.addStudent(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateStudent', () => {
    const changesStudent = {
      id: 1,
      name: 'newName1',
      gender: 'Female',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    reqMock.body = {
      id: 1,
      name: 'newName1',
      gender: 'Female',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    reqMock.params = {
      studentId: '1',
    };

    const resMock = mockResponse();

    it('student updated successfully', async () => {
      jest
        .spyOn(service, 'updateStudentService')
        .mockResolvedValue(changesStudent);
      await controller.updateStudent(reqMock.body, reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(changesStudent);
    });

    it('fail update student', async () => {
      jest
        .spyOn(service, 'updateStudentService')
        .mockRejectedValue({ err: 'Cannot Update Student' });
      await controller.updateStudent(reqMock.body, reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('deleteStudent', () => {
    const deleteOne = {
      raw: [],
      affected: 1,
    } as DeleteResult;

    reqMock.body = {
      id: 1,
      name: 'newName1',
      gender: 'Female',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    reqMock.params = {
      studentId: '1',
    };

    const resMock = mockResponse();

    it('student deleted successfully', async () => {
      jest.spyOn(service, 'deleteStudentService').mockResolvedValue(deleteOne);
      await controller.deleteStudent(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(deleteOne);
    });

    it('student deleted successfully', async () => {
      jest
        .spyOn(service, 'deleteStudentService')
        .mockRejectedValue({ err: 'Error with Deleting Student' });
      await controller.deleteStudent(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });
});
