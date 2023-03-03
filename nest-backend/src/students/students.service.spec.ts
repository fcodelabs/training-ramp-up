import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { HttpException } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useClass: class MockRepository extends Repository<Student> {},
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const student = {
        name: 'Piyumi',
        gender: 'Male',
        address: '3dd',
        mobile: '0765867087',
        dob: '2005-01-31T18:00:00.000Z',
        age: 1,
      } as any;
      global.io = { emit: jest.fn() };
      jest.spyOn(studentRepository, 'create').mockReturnValueOnce(student);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValueOnce(student as unknown as Student);

      const result = await service.create(student);

      expect(result).toEqual(student);
      expect(studentRepository.create).toHaveBeenCalledWith(student);
      expect(studentRepository.save).toHaveBeenCalledWith(student);
    });

    it('should emit an event', async () => {
      const student = {
        name: 'Piyumi',
        gender: 'Male',
        address: '3dd',
        mobile: '0765867087',
        dob: '2005-01-31T18:00:00.000Z',
        age: 1,
      } as any;
      global.io = { emit: jest.fn() };
      jest.spyOn(studentRepository, 'create').mockReturnValueOnce(student);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValueOnce(student as unknown as Student);

      await service.create(student);

      expect(global.io.emit).toHaveBeenCalledTimes(1);
      expect(global.io.emit).toHaveBeenCalledWith('notify', {
        message: 'New student added',
      });
    });

    it('should throw an error as an HttpException', async () => {
      const student = {
        name: 'Piyumi',
        gender: 'Male',
        address: '3dd',
        mobile: '0765867087',
        dob: '2005-01-31T18:00:00.000Z',
        age: 1,
      } as any;
      const error = new Error('Error');
      jest.spyOn(studentRepository, 'create').mockReturnValueOnce(student);

      jest.spyOn(studentRepository, 'save').mockRejectedValueOnce(error);

      await expect(service.create(student)).rejects.toThrowError(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const mockStudents = [
        {
          id: 1,
          name: 'John',
          gender: 'male',
          address: '123 Main St',
          mobile: '123-456-7890',
          dob: '2000-01-01',
          age: 21,
        },
        {
          id: 2,
          name: 'Jane',
          gender: 'female',
          address: '123 Main St',
          mobile: '123-456-7890',
          dob: '2000-01-01',
          age: 21,
        },
      ] as any;

      jest.spyOn(studentRepository, 'find').mockResolvedValueOnce(mockStudents);

      const result = await service.findAll();

      expect(result).toEqual(mockStudents);
      expect(studentRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error as an HttpException', async () => {
      const error = new Error('Error');
      jest.spyOn(studentRepository, 'find').mockRejectedValueOnce(error);

      await expect(service.findAll()).rejects.toThrowError(HttpException);
    });
  });

  describe('update', () => {
    const id = 1 as never;
    const foundStudent = {
      id: 1,
      name: 'Piyumi',
      gender: 'Male',
      address: 'galle',
      mobile: '0765867087',
      dob: '2005-01-31T18:00:00.000Z',
      age: 1,
    } as never;
    const student = {
      name: 'Piyumi',
      gender: 'Male',
      address: '3dd',
      mobile: '0765867087',
      dob: '2005-01-31T18:00:00.000Z',
      age: 1,
    } as never;

    const updatedStudent = {
      id: 1,
      name: 'Piyumi',
      gender: 'Male',
      address: '3dd',
      mobile: '0765867087',
      dob: '2005-01-31T18:00:00.000Z',
      age: 1,
    } as never;
    global.io = { emit: jest.fn() };

    it('should update a student', async () => {
      jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValueOnce(foundStudent);
      jest
        .spyOn(studentRepository, 'merge')
        .mockResolvedValueOnce(updatedStudent);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValueOnce(updatedStudent);

      const result = await service.update(id, student);

      expect(result).toEqual(updatedStudent);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(studentRepository.merge).toHaveBeenCalledTimes(1);
      expect(studentRepository.merge).toHaveBeenCalledWith(
        foundStudent,
        student,
      );
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should emit an event', async () => {
      jest
        .spyOn(studentRepository, 'findOne')
        .mockResolvedValueOnce(foundStudent);
      jest
        .spyOn(studentRepository, 'merge')
        .mockResolvedValueOnce(updatedStudent);
      jest
        .spyOn(studentRepository, 'save')
        .mockResolvedValueOnce(updatedStudent);

      global.io = { emit: jest.fn() };
      await service.update(id, student);

      expect(global.io.emit).toHaveBeenCalledTimes(1);
      expect(global.io.emit).toHaveBeenCalledWith('notify', {
        message: 'Details of Piyumi has updated',
      });
    });

    it('should throw an error as an HttpException', async () => {
      const error = new Error('Error');
      jest.spyOn(studentRepository, 'findOne').mockRejectedValueOnce(error);

      await expect(service.update(id, student)).rejects.toThrowError(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    const id = 1;
    global.io = { emit: jest.fn() };
    it('should delete a student', async () => {
      jest.spyOn(studentRepository, 'delete').mockResolvedValueOnce({} as any);

      await service.remove(id);

      expect(studentRepository.delete).toHaveBeenCalledTimes(1);
      expect(studentRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should emit an event', async () => {
      jest.spyOn(studentRepository, 'delete').mockResolvedValueOnce({} as any);

      await service.remove(id);
      expect(global.io.emit).toHaveBeenCalledWith('notify', {
        message: 'Student has deleted',
      });
    });

    it('should throw an error as an HttpException', async () => {
      const error = new Error('Error');
      jest.spyOn(studentRepository, 'delete').mockRejectedValueOnce(error);

      await expect(service.remove(id)).rejects.toThrowError(HttpException);
    });
  });
});
