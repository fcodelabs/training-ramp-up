import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { StudentEntity } from '../entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';

describe('StudentService', () => {
  let service: StudentService;
  let repository: any[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(StudentEntity),
          useValue: {
            find: jest.fn().mockReturnValue([{ id: 1, name: 'John' }]),
            save: jest.fn().mockReturnValue({ name: 'John' }),
            update: jest.fn().mockReturnValue({ affected: 1 }),
            findOne: jest.fn().mockReturnValue({ name: 'John' }),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get(getRepositoryToken(StudentEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStudent', () => {
    it('should return an array of students', async () => {
      const result = await service.getStudent();
      expect(result).toEqual([{ id: 1, name: 'John' }]);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return error if there is a problem with the repository', async () => {
      try {
        await service.getStudent();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository find error');
      }
    });
  });

  describe('addStudent', () => {
    it('should return a student', async () => {
      const student = {
        name: 'John',
      };
      const result = await service.addStudent(student as any);
      expect(result).toEqual(student);
    });

    it('should return error if there is a problem with the repository', async () => {
      try {
        await service.addStudent({} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository save error');
      }
    });
  });

  describe('updateStudent', () => {
    it('should return a student', async () => {
      const student = {
        name: 'John',
      };
      const result = await service.updateStudent(1, student as any);
      expect(result).toEqual({ ...student, ...{ affected: 1 } });
    });

    it('should return error if there is a problem with the repository', async () => {
      try {
        await service.updateStudent(1, {} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository update error');
      }
    });
  });

  describe('deleteStudent', () => {
    it('should return a student', async () => {
      const student = {
        name: 'John',
      };
      const result = await service.deleteStudent(1);
      expect(result).toEqual(student);
    });

    it('should return error if there is a problem with the repository', async () => {
      try {
        await service.deleteStudent(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository delete error');
      }
    });
  });
});
