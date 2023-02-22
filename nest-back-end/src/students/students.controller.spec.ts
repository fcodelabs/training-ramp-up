import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { Request } from 'express';
// import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

describe('StudentsController', () => {
  let controller: StudentsController;
  // let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    // service = module.get<StudentsService>(StudentsService);
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students = [
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
      const req = jest.fn() as any;
      const studentsService = controller['studentsService'];
      jest.spyOn(studentsService, 'findAll').mockResolvedValue(students as any);
      await controller.findAll(req);
      expect(studentsService.findAll).toBeCalled();
    });

    it('should throw error', async () => {
      const studentService = controller['studentsService'];
      const req = jest.fn() as any;
      jest
        .spyOn(studentService, 'findAll')
        .mockRejectedValue(
          new HttpException(
            'Error retrieving students',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.findAll(req);
      } catch (error) {
        expect(error.message).toBe('Error retrieving students');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
  describe('update student', () => {
    it('should update student', async () => {
      const student = {
        id: '1',
        name: 'John Doe',
        gender: 'male',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const mockStudentDto = {
        name: 'Jane Doe',
        gender: 'female',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const req = jest.fn() as any;
      const studentsService = controller['studentsService'];
      jest
        .spyOn(studentsService, 'update')
        .mockResolvedValue(mockStudentDto as any);
      await controller.update('1', mockStudentDto);
      expect(studentsService.update).toBeCalledWith(1, mockStudentDto as any);
    });

    it('should throw error', async () => {
      const studentService = controller['studentsService'];
      const req = jest.fn() as any;
      jest
        .spyOn(studentService, 'update')
        .mockRejectedValue(
          new HttpException(
            'Error updating student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.update('1', {} as any);
      } catch (error) {
        expect(error.message).toBe('Error updating student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
  describe('remove student', () => {
    it('should remove a student', async () => {
      const student = {
        id: '1',
        name: 'John Doe',
        gender: 'male',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const mockStudentDto = {
        name: 'Jane Doe',
        gender: 'female',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const req = jest.fn() as any;
      const studentsService = controller['studentsService'];
      jest
        .spyOn(studentsService, 'remove')
        .mockResolvedValue(mockStudentDto as any);
      await controller.remove('1');
      expect(studentsService.remove).toBeCalledWith(1);
    });

    it('should throw error', async () => {
      const studentService = controller['studentsService'];
      const req = jest.fn() as any;
      jest
        .spyOn(studentService, 'update')
        .mockRejectedValue(
          new HttpException(
            'Error deleting student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.remove('1');
      } catch (error) {
        expect(error.message).toBe('Error deleting student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('add student', () => {
    it('should add a student', async () => {
      const student = {
        id: '1',
        name: 'John Doe',
        gender: 'male',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const mockStudentDto = {
        name: 'John Doe',
        gender: 'female',
        address: '123 Main St',
        mobile: '1234567890',
        dob: new Date('1990-01-01'),
        age: 30,
      };
      const req = jest.fn() as any;
      const studentsService = controller['studentsService'];
      jest
        .spyOn(studentsService, 'create')
        .mockResolvedValue(mockStudentDto as any);
      await controller.create(mockStudentDto as any);
      expect(studentsService.create).toBeCalledWith(mockStudentDto as any);
    });

    it('should throw error', async () => {
      const studentService = controller['studentsService'];
      const req = jest.fn() as any;
      jest
        .spyOn(studentService, 'create')
        .mockRejectedValue(
          new HttpException(
            'Error adding student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.create({} as any);
      } catch (error) {
        expect(error.message).toBe('Error adding student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
