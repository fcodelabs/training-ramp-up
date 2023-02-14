/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateStudentDto } from './../dtos/updateStudent.dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from '../services/student.service';
import { StudentController } from './student.controller';
import { Student } from '../../entity/student';
import { gateWay } from '../../web-socket/gateway';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;
  let gateway: gateWay;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            createStudent: jest.fn(),
            getStudents: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
        gateWay,
        {
          provide: gateWay,
          useValue: {
            sendNotification: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
    gateway = module.get<gateWay>(gateWay);
  });

  describe('Find all', () => {
    const result: Student[] = [
      {
        PersonID: 1,
        PersonName: 'test',
        PersonGender: 'Male',
        PersonAddress: 'test',
        PersonMobileNo: 'test',
        DateOfBirth: new Date(),
      },
    ];

    it('Find all success', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'getStudents')
        .mockResolvedValue(result);
      const response = await controller.getAllStudents();
      expect(response).toEqual(result);
      spyGetStudents.mockRestore();
    });

    it('Find all failed', async () => {
      try {
        // eslint-disable-next-line no-var
        var spyGetStudents = jest
          .spyOn(service, 'getStudents')
          .mockRejectedValue(null);
        const response = await controller.getAllStudents();
      } catch (err) {
        expect(err).toEqual(null);
      }
      spyGetStudents.mockRestore();
    });
  });

  describe('Add student', () => {
    const result: Student = {
      PersonID: 1,
      PersonName: 'test',
      PersonGender: 'Male',
      PersonAddress: 'test',
      PersonMobileNo: 'test',
      DateOfBirth: new Date(),
    };
    const output: Student = {
      PersonID: 1,
      PersonName: 'test',
      PersonGender: 'Male',
      PersonAddress: 'test',
      PersonMobileNo: 'test',
      DateOfBirth: new Date(),
    };
    const insertResult = {
      identifiers: [{ id: 5 }],
      generatedMaps: [{ id: 5 }],
      raw: [{ id: 5 }],
    };

    it('Add student success', async () => {
      const spyAddStudent = jest
        .spyOn(service, 'createStudent')
        .mockResolvedValue(output);
      const spyNotify = jest.spyOn(gateway, 'sendNotification');
      const response = await controller.createStudent(result);
      expect(response).toEqual(output);
      expect(spyNotify).toHaveBeenCalled();
      expect(spyNotify).toHaveBeenCalledWith('Student added successfully');
      spyAddStudent.mockRestore();
    });

    it('Add student failed', async () => {
      try {
        // eslint-disable-next-line no-var
        var spyAddStudent = jest
          .spyOn(service, 'createStudent')
          .mockResolvedValue(null);
        const response = await controller.createStudent(result);
      } catch (err) {
        spyAddStudent.mockRestore();
        expect(err).toEqual(null);
      }
    });
  });

  describe('Update student', () => {
    const id = '5';
    const student: UpdateStudentDto = {
      PersonID: 1,
      PersonName: 'test',
      PersonGender: 'Male',
      PersonAddress: 'test',
      PersonMobileNo: 'test',
      DateOfBirth: new Date(),
    };
    const result: UpdateStudentDto = {
      PersonID: 1,
      PersonName: 'test',
      PersonGender: 'Male',
      PersonAddress: 'test',
      PersonMobileNo: 'test',
      DateOfBirth: new Date(),
    };
    const updateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    it('Update student success', async () => {
      const spyUpdateStudent = jest
        .spyOn(service, 'updateStudent')
        .mockResolvedValue(result);
      const spyNotify = jest.spyOn(gateway, 'sendNotification');
      const response = await controller.updateStudent(student);
      expect(response).toEqual(result);
      expect(spyNotify).toHaveBeenCalled();
      expect(spyNotify).toHaveBeenCalledWith('Student updated successfully');
      spyUpdateStudent.mockRestore();
    });

    it('Update student failed', async () => {
      try {
        // eslint-disable-next-line no-var
        var spyUpdateStudent = jest
          .spyOn(service, 'updateStudent')
          .mockResolvedValue(null);
        const response = await controller.updateStudent(student);
      } catch (err) {
        spyUpdateStudent.mockRestore();
        expect(err).toEqual(null);
      }
    });
  });

  describe('Delete student', () => {
    const id = 5;
    const deleteResult = {
      raw: [],
      affected: 1,
    };

    it('Delete student success', async () => {
      const spyDeleteStudent = jest
        .spyOn(service, 'deleteStudent')
        .mockResolvedValue(deleteResult);
      const spyNotify = jest.spyOn(gateway, 'sendNotification');
      const response = await controller.deleteStudent(id);
      expect(response).toEqual(deleteResult);
      expect(spyNotify).toHaveBeenCalled();
      expect(spyNotify).toHaveBeenCalledWith('Student deleted successfully');
      spyDeleteStudent.mockRestore();
    });

    it('Delete student failed', async () => {
      try {
        // eslint-disable-next-line no-var
        var spyDeleteStudent = jest
          .spyOn(service, 'deleteStudent')
          .mockResolvedValue(null);
        const response = await controller.deleteStudent(id);
      } catch (err) {
        spyDeleteStudent.mockRestore();
        expect(err).toEqual(null);
      }
    });
  });
});
