import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from '../service/student.service';
import { Response } from 'express';
import { SocketGateway } from '../../utils/socket.gateway';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('StudentController', () => {
  let controller: StudentController;

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: SocketGateway,
          useValue: {
            emitEvent: jest.fn(),
          },
        },
        {
          provide: StudentService,
          useValue: {
            getStudent: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
            addStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStudent', () => {
    it('should return student', async () => {
      const students = [
        {
          id: 1,
          name: 'John',
          age: 20,
          address: 'New York',
          gender: 'Male',
          birthday: new Date('1999-01-01'),
          mobile: '1234567890',
        },
      ];
      const studentService = controller['studentService'];
      jest.spyOn(studentService, 'getStudent').mockResolvedValue(students);
      await controller.getStudent(responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(students);
    });

    it('should throw error', async () => {
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'getStudent')
        .mockRejectedValue(
          new HttpException(
            'Error retrieving students',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.getStudent(responseMock);
      } catch (error) {
        expect(error.message).toBe('Error retrieving students');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('updateStudent', () => {
    it('should update a student and emit a notification event', async () => {
      const mockStudent = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      const mockStudentDto = { name: 'Jane Doe', email: 'janedoe@example.com' };
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'updateStudent')
        .mockResolvedValue(mockStudent as any);

      await controller.updateStudent(1, mockStudentDto as any, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(controller['socketGateway'].emitEvent).toBeCalledWith(
        'notification',
        `Student's data updated successfully with name ${mockStudent.name}`,
      );
    });
    it('should return a 500 error if there is a problem updating the student', async () => {
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'updateStudent')
        .mockRejectedValue(
          new HttpException(
            'Error updating student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.updateStudent(1, {} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe('Error updating student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student and emit a notification event', async () => {
      const mockStudent = {
        id: 1,
        name: 'John Doe',
      };
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'deleteStudent')
        .mockResolvedValue(mockStudent as any);

      await controller.deleteStudent(1, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(controller['socketGateway'].emitEvent).toBeCalledWith(
        'notification',
        `Student deleted Successfully with name ${mockStudent.name}`,
      );
    });

    it('should return a 500 error if there is a problem deleting the student', async () => {
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'deleteStudent')
        .mockRejectedValue(
          new HttpException(
            'Error deleting student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.deleteStudent(1, responseMock);
      } catch (error) {
        expect(error.message).toBe('Error deleting student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('addStudent', () => {
    it('should add a student and emit a notification event', async () => {
      const mockStudent = {
        id: 1,
        name: 'John Doe',
      };
      const mockStudentDto = { name: 'Jane Doe' };
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'addStudent')
        .mockResolvedValue(mockStudent as any);

      await controller.addStudent(mockStudentDto as any, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(controller['socketGateway'].emitEvent).toBeCalledWith(
        'notification',
        `Student added Successfully with name ${mockStudent.name}`,
      );
    });

    it('should return a 500 error if there is a problem adding the student', async () => {
      const studentService = controller['studentService'];
      jest
        .spyOn(studentService, 'addStudent')
        .mockRejectedValue(
          new HttpException(
            'Error adding student',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.addStudent({} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe('Error adding student');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
