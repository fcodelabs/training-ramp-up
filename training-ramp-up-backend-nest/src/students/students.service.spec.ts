import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;
  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
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

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      STUDENT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(studentRepository).toBeDefined();
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
    const noStudentFoundEx = new NotFoundException('No students found');
    it('Find all success', async () => {
      studentRepository.find = jest.fn().mockResolvedValue(result);
      const res = await service.findAll();
      expect(res).toEqual(result);
    });

    it('No students found', async () => {
      try {
        studentRepository.find = jest.fn().mockResolvedValue(null);
        const res = await service.findAll();
      } catch (err) {
        expect(err).toEqual(noStudentFoundEx);
      }
    });

    it('Find all failed', async () => {
      try {
        studentRepository.find = jest.fn().mockRejectedValue(null);
        const res = await service.findAll();
      } catch (err) {
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
      studentRepository.insert = jest.fn().mockResolvedValue(insertResult);
      const res = await service.create(student);
      expect(res).toEqual(insertResult);
    });

    it('Add student failed', async () => {
      try {
        studentRepository.find = jest.fn().mockRejectedValue(null);
        const res = await service.findAll();
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Update student', () => {
    const id: number = 5;
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
      studentRepository.update = jest.fn().mockResolvedValue(updateResult);
      const res = await service.update(id, student);
      expect(res).toEqual(updateResult);
    });

    it('Update student failed', async () => {
      try {
        studentRepository.update = jest.fn().mockRejectedValue(null);
        const res = await service.update(id, student);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Delete student', () => {
    const id: number = 5;
    const deleteResult = {
      raw: [],
      affected: 1,
    };

    it('Delete student success', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue(deleteResult);
      const res = await service.remove(id);
      expect(res).toEqual(deleteResult);
    });

    it('Delete student failed', async () => {
      try {
        studentRepository.delete = jest.fn().mockRejectedValue(null);
        const res = await service.remove(id);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });
});
