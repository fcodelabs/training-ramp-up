import { Test, TestingModule } from '@nestjs/testing';
import { Student } from './entities/student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common/services';
import { NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  describe('Find all', () => {
    const result: Student[] = [
      {
        id: 5,
        name: 'lasan',
        gender: 'female',
        address: 'address',
        mobileNo: '0771267139',
        dateOfBirth: new Date('2000-02-09'),
        age: 23,
      },
    ];

    it('Find all success', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(result);
      const response = await controller.findAll();
      expect(response).toEqual(result);
      spyGetStudents.mockRestore();
    });

    it('Find all failed', async () => {
      try {
        var spyGetStudents = jest
          .spyOn(service, 'findAll')
          .mockRejectedValue(null);
        const response = await controller.findAll();
      } catch (err) {
        spyGetStudents.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Add student', () => {
    const student: Student = {
      id: 5,
      name: 'lasan',
      gender: 'female',
      address: 'address',
      mobileNo: '0771267139',
      dateOfBirth: new Date('2000-02-09'),
      age: 23,
    };

    const insertResult = {
      identifiers: [{ id: 5 }],
      generatedMaps: [{ id: 5 }],
      raw: [{ id: 5 }],
    };

    it('Add student success', async () => {
      const spyAddStudent = jest
        .spyOn(service, 'create')
        .mockResolvedValue(insertResult);
      const response = await controller.create(student);
      expect(response).toEqual(insertResult);
      spyAddStudent.mockRestore();
    });

    it('Add student failed', async () => {
      try {
        var spyAddStudent = jest
          .spyOn(service, 'create')
          .mockResolvedValue(null);
        const response = await controller.create(student);
      } catch (err) {
        spyAddStudent.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Update student', () => {
    const id: string = '5';
    const student: UpdateStudentDto = {
      name: 'lasan',
      gender: 'male',
      address: 'address',
      mobileNo: '0771267139',
      dateOfBirth: new Date('2000-02-09'),
      age: 23,
    };

    const updateResult = {
      generatedMaps: [],
      raw: [],
      affected: 1,
    };

    it('Update student success', async () => {
      const spyUpdateStudent = jest
        .spyOn(service, 'update')
        .mockResolvedValue(updateResult);
      const response = await controller.update(id, student);
      expect(response).toEqual(updateResult);
      spyUpdateStudent.mockRestore();
    });

    it('Update student failed', async () => {
      try {
        var spyUpdateStudent = jest
          .spyOn(service, 'update')
          .mockResolvedValue(null);
        const response = await controller.update(id, student);
      } catch (err) {
        spyUpdateStudent.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Delete student', () => {
    const id: string = '5';
    const deleteResult = {
      raw: [],
      affected: 1,
    };

    it('Delete student success', async () => {
      const spyDeleteStudent = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(deleteResult);
      const response = await controller.remove(id);
      expect(response).toEqual(deleteResult);
      spyDeleteStudent.mockRestore();
    });

    it('Delete student failed', async () => {
      try {
        var spyDeleteStudent = jest
          .spyOn(service, 'remove')
          .mockResolvedValue(null);
        const response = await controller.remove(id);
      } catch (err) {
        spyDeleteStudent.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });
});
