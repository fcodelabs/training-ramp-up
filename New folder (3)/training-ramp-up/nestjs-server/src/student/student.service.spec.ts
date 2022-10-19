import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from '../dto/student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;
  const student = [
    {
      id: 1,
      name: 'test',
      gender: 'Male',
      address: 'testAddress',
      mobile_number: '123456789',
      date: new Date('2001-04-05 00:00:00'),
      age: 21,
    },
    {
      id: 2,
      name: 'test',
      gender: 'Male',
      address: 'testAddress',
      mobile_number: '123456789',
      date: new Date('2001-04-05 00:00:00'),
      age: 21,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),

          useValue: {
            find: jest.fn(() => [
              {
                id: 1,
                name: 'test',
                gender: 'Male',
                address: 'testAddress',
                mobile_number: '123456789',
                date: new Date('2001-04-05 00:00:00'),
                age: 21,
              },
            ]),
            save: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                student.push(x);
                return x;
              }
            }),
            findOne: jest.fn((x) => {
              const index = student
                .map((object) => object.id)
                .indexOf(x.where.id);

              if (index == -1) {
                return null;
              } else {
                return student[index];
              }
            }),
            merge: jest.fn((x, y) => {
              x = y;
              return x;
            }),
            remove: jest.fn((x) => {
              const index = student.map((object) => object.id).indexOf(x.id);
              student.splice(1, index);
              return student;
            }),
            findOneBy: jest.fn((x) => {
              const index = student.map((object) => object.id).indexOf(x.id);
              if (index == -1) {
                return null;
              } else {
                return student[index];
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(studentRepository).toBeDefined();
  });
  describe('Get Student', () => {
    it('it should get all student', async () => {
      const studentData = [
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
      const res = await service.getAll();
      expect(res).toEqual(studentData);
    });
  });
  describe('Create Student', () => {
    it('it should create success', async () => {
      const resStudent = {
        id: 3,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      const studentData: StudentDto = {
        id: 3,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      const res = await service.addOne(studentData);
      expect(res).toEqual(resStudent);
    });
    it('student create fails', async () => {
      const req = null;
      const res = await service.addOne(req);
      expect(res).toEqual(null);
    });
  });
  describe('Delete Student', () => {
    it('it should delete success', async () => {
      const req = 2;

      const studentDetails = {
        id: 2,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      };

      const res = await service.deleteOne(req);
      expect(res).toEqual(studentDetails);
    });
    it('student delete fail', async () => {
      const req = 10;
      const res = await service.deleteOne(req);
      expect(res).toEqual(null);
    });
  });
  describe('Update Student', () => {
    it('student merge', async () => {
      const req = {
        id: 3,
        name: 'testName',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 22,
      };
      const studentData = {
        id: 3,
        name: 'testName',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 22,
      };

      const res = await service.updateOne(req);
      expect(res).toEqual(studentData);
    });
    it('student update fail', async () => {
      const req = {
        id: 33,
        name: 'testName',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 22,
      } as any;

      const res = studentRepository.findOneBy(req);
      expect(res).toEqual(null);
    });
  });
});
