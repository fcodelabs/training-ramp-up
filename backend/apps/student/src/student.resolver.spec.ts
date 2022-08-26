import { Test } from '@nestjs/testing';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

describe('StudentResolver', () => {
  let studentResolver: StudentResolver;
  let studentArray: [
    {
      id: '123';
      name: 'asda';
      gender: 'male';
      address: 'asdad';
      mobileNo: '12';
      dateOfBirth: '2022-08-02 00:00:00';
      inEdit: false;
      age: 2;
      isArchive: false;
    },
  ];
  const student = {
    id: '123',
    name: 'asda',
    gender: 'male',
    address: 'asdad',
    mobileNo: '12',
    dateOfBirth: new Date(),
    inEdit: false,
    age: 2,
    isArchive: false,
  };
  const mockStudentService = {
    findAll: jest.fn(() => Promise.resolve(studentArray)),
    findOne: jest.fn(() => Promise.resolve(studentArray)),
    delete: jest.fn(() => Promise.resolve(student)),
    create: jest.fn(() => Promise.resolve(student)),
    update: jest.fn(() => Promise.resolve(student)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    studentResolver = moduleRef.get<StudentResolver>(StudentResolver);
  });

  describe('findAll', () => {
    it('return students array', async () => {
      expect(await studentResolver.findAll()).toEqual(studentArray);
    });
  });

  describe('findone', () => {
    it('return student array', async () => {
      const id = '123';
      expect(await studentResolver.findOne(id)).toEqual(studentArray);
    });
  });

  describe('delete', () => {
    it('return student array', async () => {
      const id = '123';
      expect(await studentResolver.delete(id)).toEqual(student);
    });
  });

  describe('create', () => {
    it('return student array', async () => {
      const studentDetails = {
        name: 'sunil',
        gender: 'male',
        address: 'asdad',
        mobileNo: '12',
        dateOfBirth: new Date(),
        inEdit: false,
        age: 2,
        isArchive: false,
      };
      expect(await studentResolver.create(studentDetails)).toEqual(student);
    });
  });

  describe('update', () => {
    it('return updated student', async () => {
      expect(await studentResolver.update(student)).toBe(student);
    });
  });
});
