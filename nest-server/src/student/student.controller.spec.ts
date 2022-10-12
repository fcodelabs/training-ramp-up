import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Students } from '../dto/student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            getAll: jest.fn(),
            createPost: jest.fn(),
            deleteOne: jest.fn(),
            updateStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Services should be defined', () => {
    expect(studentService).toBeDefined();
  });
  describe('get student ', () => {
    it('should get all student success', async () => {
      const student = [
        {
          id: 1,
          name: 'test',
          gender: 'Male',
          address: 'testAddress',
          mobile_number: '123456789',
          date: new Date('2001-04-05 00:00:00'),
          age: 21,
        } as never,
      ];
      jest.spyOn(studentService, 'getAll').mockResolvedValueOnce(student);
      const res = await controller.getAll();
      expect(res).toStrictEqual(student);
    });

    it('should get all student error', async () => {
      jest.spyOn(studentService, 'getAll').mockResolvedValueOnce(null);
      const res = await controller.getAll();
      expect(res).toStrictEqual(null);
    });
  });

  describe('create student ', () => {
    it(' create student success', async () => {
      const student: Students = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;

      const student1: Students = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      jest.spyOn(studentService, 'createPost').mockResolvedValueOnce(student);
      const res = await controller.create(student1);
      expect(res).toStrictEqual(student);
    });

    it('create student error', async () => {
      const student1: Students = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      jest.spyOn(studentService, 'createPost').mockResolvedValueOnce(null);
      const res = await controller.create(student1);
      expect(res).toStrictEqual(null);
    });
  });

  describe('Delete student ', () => {
    it('should delete student success', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;

      const student1 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as any;
      jest.spyOn(studentService, 'deleteOne').mockResolvedValueOnce(student1);
      const res = await controller.delete(req);
      expect(res).toStrictEqual(student1);
    });

    it('should delete student error', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;

      jest.spyOn(studentService, 'deleteOne').mockResolvedValueOnce(null);
      const res = await controller.delete(req);
      expect(res).toStrictEqual(null);
    });
  });

  describe('Update student ', () => {
    it('should Update student success', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;

      const student1 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as any;
      const student2 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as any;
      jest
        .spyOn(studentService, 'updateStudent')
        .mockResolvedValueOnce(student1);
      const res = await controller.Update(req, student2);
      expect(res).toStrictEqual(student1);
    });

    it('should delete student error', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;

      jest.spyOn(studentService, 'deleteOne').mockResolvedValueOnce(null);
      const res = await controller.delete(req);
      expect(res).toStrictEqual(null);
    });
  });
});
