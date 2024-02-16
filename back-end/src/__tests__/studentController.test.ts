import { all, one, save, remove, update } from '../controllers/studentController';
import { type Request, type Response } from 'express';
import dataSource from '../config/dataSource';
import { Student } from '../models/student';

jest.mock('../config/dataSource', () => ({
  getRepository: jest.fn().mockReturnValue({
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  })
}));

describe('Student Controller', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  const studentRepository = dataSource.getRepository(Student);

  describe('all function', () => {
    beforeEach(() => {
      request = {};
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should returns all students in the database in json format', async () => {
      const mockStudents = [
        { id: 1, name: 'Sudarshan' },
        { id: 2, name: 'Sudarshan' }
      ];
      (studentRepository.find as jest.Mock).mockResolvedValue(mockStudents);
      await all(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(mockStudents);
    });

    it('should returns a 500 error if the database throws an error', async () => {
      (studentRepository.find as jest.Mock).mockRejectedValue(new Error('Database error'));
      await all(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error retrieving student data' });
    });
  });

  describe('one function', () => {
    beforeEach(() => {
      request = {
        params: {
          id: '1'
        }
      };
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should returns a student in json format', async () => {
      const mockStudent = { id: 1, name: 'Sudarshan' };
      (studentRepository.findOneBy as jest.Mock).mockResolvedValue(mockStudent);
      await one(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(mockStudent);
    });

    it('should returns a 404 error if the student is not found', async () => {
      (studentRepository.findOneBy as jest.Mock).mockResolvedValue(null);
      await one(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: 'Student not found' });
    });

    it('should returns a 500 error if the database throws an error', async () => {
      (studentRepository.findOneBy as jest.Mock).mockRejectedValue(new Error('Database error'));
      await one(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error retrieving student' });
    });
  });

  describe('save function', () => {
    const mockNewStudent = { id: 1, name: 'Sudarshan' };
    beforeEach(() => {
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it(' when there is no student with new student id should response new student in json format with status code 201', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue(null);
      (studentRepository.save as jest.Mock).mockResolvedValue(mockNewStudent);
      request = {
        body: mockNewStudent
      };
      await save(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(mockNewStudent);
    });

    it('when there is a student with new student id should response status code 400', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue(mockNewStudent);
      request = {
        body: mockNewStudent
      };
      await save(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ message: 'Student with this ID already exists' });
    });

    it('should response status code 500 when database throws an error', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue(null);
      (studentRepository.save as jest.Mock).mockRejectedValue(new Error('Database error'));
      request = {
        body: mockNewStudent
      };
      await save(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error saving student' });
    });

    it('should response status code 500 for not formated requests', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue(null);
      (studentRepository.save as jest.Mock).mockRejectedValue(new Error('Database error'));
      request = {
        body: { age: 20, name: 'Sudarshan' }
      };
      await save(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error saving student' });
    });
  });

  describe('remove function', () => {
    beforeEach(() => {
      request = {
        params: {
          id: '1'
        }
      };
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should response status code 200 when student is removed', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue({ id: 1, name: 'Sudarshan' });
      (studentRepository.remove as jest.Mock).mockResolvedValue({ id: 1, name: 'Sudarshan' });
      await remove(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ id: 1, name: 'Sudarshan' });
    });

    it('should response status code 404 when student is not found', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue(null);
      await remove(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ message: 'Student not found' });
    });

    it('should response status code 500 when database throws an error', async () => {
      (studentRepository.findOneBy as jest.Mock).mockReturnValue({ id: 1, name: 'Sudarshan' });
      (studentRepository.remove as jest.Mock).mockRejectedValue(new Error('Database error'));
      await remove(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error removing student' });
    });
  });

  describe('update function', () => {
    const mockNewStudent = { id: 1, name: 'Sudarshan' };
    beforeEach(() => {
      response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    it('should response status code 201 when student is updated', async () => {
      (studentRepository.save as jest.Mock).mockResolvedValue(mockNewStudent);
      request = {
        body: mockNewStudent
      };
      await update(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(mockNewStudent);
    });

    it('should response status code 500 when database throws an error', async () => {
      (studentRepository.save as jest.Mock).mockRejectedValue(new Error('Database error'));
      request = {
        body: mockNewStudent
      };
      await update(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error updating student' });
    });

    it('should response status code 500 for not formated requests', async () => {
      (studentRepository.save as jest.Mock).mockRejectedValue(new Error('Database error'));
      request = {
        body: { age: 20, name: 'Sudarshan' }
      };
      await update(request as Request, response as Response);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Error updating student' });
    });
  });
});
