import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: any[];

  const mockStudents = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      address: '123 Main St',
      mobile: '1234567890',
      dob: new Date('1990-01-01'),
      age: 30,
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'female',
      address: '456 Elm St',
      mobile: '0987654321',
      dob: new Date('1995-06-15'),
      age: 25,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            find: jest.fn().mockReturnValue(mockStudents),
            save: jest.fn().mockReturnValue('created'),
            findOneBy: jest.fn().mockReturnValue(mockStudents[0]),
            remove: jest.fn().mockReturnValue('removed'),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get(getRepositoryToken(Student));
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockStudents);
      expect(repository.find).toHaveBeenCalled();
    });

    it('should return an error if failed to find', async () => {
      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository find error');
      }
    });
  });

  describe('create', () => {
    it('should return created if student is successfully added', async () => {
      const student = {
        name: 'joe',
      };
      const result = await service.create(student as any);
      expect(result).toEqual('created');
    });

    it('should return an error if failed to add', async () => {
      try {
        const student = {
          name: 'joe',
        };
        await service.create(student as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository save error');
      }
    });
  });

  describe('update', () => {
    it('should return created if student is updated successfully', async () => {
      const result = await service.update(0, mockStudents[1]);
      expect(result).toEqual('created');
    });
    it('should return an error if failed to update', async () => {
      try {
        const student = {
          name: 'joe',
        };
        await service.update(1, student as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository save error');
      }
    });
  });

  describe('remove', () => {
    it('should return removed if student is removed successfully', async () => {
      const result = await service.remove(0);
      expect(result).toEqual('removed');
    });
    it('should return an error if failed to remove', async () => {
      try {
        await service.remove(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Repository delete error');
      }
    });
  });
});
