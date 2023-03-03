import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto = {
        name: 'Piyumi',
        gender: 'Male',
        address: '3d',
        mobile: '0765867087',
        dob: '2005-01-31T18:00:00.000Z',
        age: 1,
      } as any;

      const mockService = controller['studentsService'];

      jest.spyOn(mockService, 'create').mockResolvedValue(createStudentDto);

      expect(await controller.create(createStudentDto)).toBe(createStudentDto);
      expect(mockService.create).toHaveBeenCalledWith(createStudentDto);
      expect(mockService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const mockService = controller['studentsService'];

      jest
        .spyOn(mockService, 'create')
        .mockRejectedValue(
          new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR),
        );

      await expect(controller.create({} as any)).rejects.toThrowError('Error');
      expect(mockService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const mockService = controller['studentsService'];

      jest.spyOn(mockService, 'findAll').mockResolvedValue([]);

      expect(await controller.findAll()).toEqual([]);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const mockService = controller['studentsService'];

      jest
        .spyOn(mockService, 'findAll')
        .mockRejectedValue(
          new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR),
        );

      await expect(controller.findAll()).rejects.toThrowError('Error');
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const mockService = controller['studentsService'];
      jest.spyOn(mockService, 'update').mockResolvedValue({} as any);

      expect(await controller.update('1', {} as any)).toEqual({});
      expect(mockService.update).toHaveBeenCalledWith(1, {} as any);
      expect(mockService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const mockService = controller['studentsService'];

      jest
        .spyOn(mockService, 'update')
        .mockRejectedValue(
          new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR),
        );

      await expect(controller.update('1', {} as any)).rejects.toThrowError(
        'Error',
      );
      expect(mockService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a student', async () => {
      const mockService = controller['studentsService'];
      jest.spyOn(mockService, 'remove').mockResolvedValue({} as any);

      expect(await controller.remove('1')).toEqual({});
      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(mockService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const mockService = controller['studentsService'];

      jest
        .spyOn(mockService, 'remove')
        .mockRejectedValue(
          new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR),
        );

      await expect(controller.remove('1')).rejects.toThrowError('Error');
      expect(mockService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
