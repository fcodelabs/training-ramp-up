import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentDto } from '../dto/student.dto';
import { Student } from 'src/entity/student.entity';

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;
  const studentData = [
    {
      id: 1,
      name: 'test',
      gender: 'Male',
      address: 'testAddress',
      mobileNo: '123456789',
      birth: new Date('2001-04-05 00:00:00'),
      age: '21',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            getAll: jest.fn(() => {
              return studentData;
            }),
            addOne: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                studentData.push(x);
                return x;
              }
            }),
            deleteOne: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                const index = studentData.map((object) => object.id).indexOf(x);
                studentData.splice(1, index);
                return studentData;
              }
            }),
            updateOne: jest.fn((x) => {
              if (x == null) {
                return null;
              } else {
                const index = studentData
                  .map((object) => object.id)
                  .indexOf(x.id);

                studentData.splice(index, 1, x);
                return studentData;
              }
            }),
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
      const student = {
        id: 2,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      };
      const req: StudentDto = {
        id: 2,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobileNo: '123456789',
        birth: new Date('2001-04-05 00:00:00'),
        age: '21',
      } as any;

      const res = await controller.addStudent(req);
      expect(res).toStrictEqual(student);
    });
    it('create student fails', async () => {
      const res = await controller.addStudent(null);
      expect(res).toStrictEqual({ msg: 'student post error' });
    });
  });
  describe('delete student success', () => {
    it('should delete student', async () => {
      const student = [
        {
          id: 1,
          name: 'test',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: '21',
        },
      ];
      const req = {
        params: {
          id: 2,
        },
      };

      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual(student);
    });
    it('student delete fail', async () => {
      const req = {
        params: {
          id: null,
        },
      };
      const res = await controller.deleteStudent(req);
      expect(res).toStrictEqual({ msg: 'student delete error' });
    });
  });
  describe('update student ', () => {
    it('update student success', async () => {
      const req = {
        body: {
          id: 1,
          name: 'testName',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: '21',
        },
      };
      const res = {
        json: jest.fn((x) => x),
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
      const user = [
        {
          id: 1,
          name: 'testName',
          gender: 'Male',
          address: 'testAddress',
          mobileNo: '123456789',
          birth: new Date('2001-04-05 00:00:00'),
          age: '21',
        },
      ];
      const response = await controller.updateStudent(req, res);
      expect(response).toStrictEqual(user);
    });
    it('student update fail', async () => {
      const req = {
        body: null,
      };
      const res = {
        json: jest.fn((x) => x),
      };
      const response = await controller.updateStudent(req, res);
      expect(response).toStrictEqual('Error Update Student');
    });
  });
});
