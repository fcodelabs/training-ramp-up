import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentCreateDto } from 'apps/file-processing/src/dto/create-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let studentService: StudentService;
  const id = '123';
  let studentArray: [
    {
      id: '123';
      name: 'new12';
      gender: 'male';
      address: 'aa';
      dateOfBirth: '2022-07-31T18:30:00.000Z';
      mobileNo: '123';
      age: 2;
      inEdit: false;
      isArchive: false;
    },
  ];
  const student = {
    name: 'new12',
    gender: 'male',
    address: 'aa',
    dateOfBirth: new Date(),
    mobileNo: '123',
    age: 2,
    inEdit: false,
    isArchive: false,
  };
  const createdStudent = {
    id: '123',
    name: 'new12',
    gender: 'male',
    address: 'aa',
    dateOfBirth: new Date(),
    mobileNo: '123',
    age: 2,
    inEdit: false,
    isArchive: false,
  };

  const mockedRepo = {
    find: jest.fn(() => Promise.resolve(studentArray)),
    create: jest.fn(() => Promise.resolve(student)),
    save: jest.fn(() => Promise.resolve(createdStudent)),
    findOneBy: jest.fn(() => Promise.resolve(createdStudent)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    studentService = moduleRef.get<StudentService>(StudentService);
  });

  describe('findAll', () => {
    it('returns students array', async () => {
      expect(await studentService.findAll()).toEqual(studentArray);
    });
  });

  describe('findOne', () => {
    it('returns student array', async () => {
      expect(await studentService.findOne(id)).toEqual(studentArray);
    });
  });

  describe('create', () => {
    it('returns student object', async () => {
      expect(await studentService.create(student)).toEqual(createdStudent);
    });
  });

  describe('delete', () => {
    it('returns student object', async () => {
      expect(await studentService.delete(id)).toEqual(createdStudent);
    });
  });
  describe('update', () => {
    it('returns student object', async () => {
      expect(await studentService.update(id, createdStudent)).toEqual(
        createdStudent,
      );
    });
  });
});
