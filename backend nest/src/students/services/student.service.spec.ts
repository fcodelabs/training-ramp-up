/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateStudentDto } from './../dtos/updateStudent.dto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '../../entity/student';
import { Repository } from 'typeorm';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;
  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: STUDENT_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      STUDENT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(studentRepository).toBeDefined();
  });

  describe('getStudents', () => {
    const noStudentFoundEx = new NotFoundException('No students found');
    const result = [
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
      studentRepository.find = jest.fn().mockResolvedValue(result);
      const res = await service.getStudents();
      expect(res).toEqual(result);
    });
    it('No students found', async () => {
      try {
        studentRepository.find = jest.fn().mockResolvedValue(null);
        const res = await service.getStudents();
      } catch (err) {
        expect(err).toEqual(noStudentFoundEx);
      }
    });
    it('Find all failed', async () => {
      try {
        studentRepository.find = jest.fn().mockRejectedValue(null);
        const res = await service.getStudents();
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });
  describe('Add student', () => {
    const student: Student = {
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
      studentRepository.save = jest.fn().mockResolvedValue(insertResult);
      const res = await service.createStudent(student);
      expect(res).toEqual(insertResult);
    });

    it('Add student failed', async () => {
      try {
        studentRepository.save = jest.fn().mockRejectedValue(null);
        const res = await service.createStudent(student);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Update student', () => {
    const id = 5;
    const student: UpdateStudentDto = {
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
      studentRepository.save = jest.fn().mockResolvedValue(updateResult);
      const res = await service.updateStudent(student);
      expect(res).toEqual(updateResult);
    });

    it('Update student failed', async () => {
      try {
        studentRepository.save = jest.fn().mockRejectedValue(null);
        const res = await service.updateStudent(student);
      } catch (err) {
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
      studentRepository.delete = jest.fn().mockResolvedValue(deleteResult);
      const res = await service.deleteStudent(id);
      expect(res).toEqual(deleteResult);
    });

    it('Delete student failed', async () => {
      try {
        studentRepository.delete = jest.fn().mockRejectedValue(null);
        const res = await service.deleteStudent(id);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });
});
