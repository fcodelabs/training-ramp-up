import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentDto } from '../dto/student.dto';
import { Student } from 'src/entity/student.entity';

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
            getAll: jest.fn(() => [
              {
                id: 1,
                name: 'test',
                gender: 'Male',
                address: 'testAddress',
                mobileNo: '123456789',
                birth: new Date('2001-04-05 00:00:00'),
                age: '21',
              } as any,
            ]),
            addOne: jest.fn((x) => x),
            deleteOne: jest.fn((x) => x),
            updateOne: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Services should be defined', () => {
    expect(studentService).toBeDefined();
  });
  describe('get student success', () => {
    it('should create student', async () => {
      const student = [
        {
          id: 1,
          name: 'test',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: '21',
        } as any,
      ];

      await studentService.getAll();
      const res = await controller.getStudent();
      expect(res).toStrictEqual(student);
    });
    it('get student fails', async () => {
      jest.spyOn(studentService, 'getAll').mockResolvedValue(null);
      const res = await controller.getStudent();
      expect(res).toStrictEqual({ msg: 'student get error' });
    });
  });

  describe('create student success', () => {
    it('should create student', async () => {
      const student_01 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;
      const student_1: StudentDto = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;

      await studentService.addOne(student_01);
      const res = await controller.addStudent(student_1);
      expect(res).toStrictEqual(student_01);
    });
    it('create student fails', async () => {
      await studentService.addOne(null);
      const res = await controller.addStudent(null);
      expect(res).toStrictEqual({ msg: 'student post error' });
    });
  });
  describe('delete student success', () => {
    it('should delete student', async () => {
      const student = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;
      const req = {
        params: {
          id: 1,
        },
      };
      const studentId = 1;
      const res = await controller.deleteStudent(req);
      await studentService.deleteOne(student);
      expect(res).toStrictEqual(studentId);
    });
    it('delete student fails', async () => {
      const req = {
        params: {
          id: null,
        },
      };

      await studentService.deleteOne(null);
      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual({ msg: 'student delete error' });
    });
  });
  describe('update student ', () => {
    it('update student success', async () => {
      const student = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;
      const req = {
        body: {
          id: 1,
          name: 'test',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: '21',
        },
      };
      const res = {
        send: jest.fn(() => [
          {
            id: 1,
            name: 'test',
            gender: 'Male',
            address: 'testAddress',
            mobileNo: '123456789',
            birth: new Date('2001-04-05 00:00:00'),
            age: '21',
          },
        ]),
      };
      const user = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;

      await studentService.updateOne(student);
      const response = await controller.updateStudent(req, res);
      expect(response).toStrictEqual(user);
    });
    it('update student fails', async () => {
      const req = {
        body: null,
      };
      const res = {
        send: jest.fn(() => null),
      };

      await studentService.updateOne(null);
      const response = await controller.updateStudent(req, res);
      expect(response).toStrictEqual(undefined);
    });
  });
});
