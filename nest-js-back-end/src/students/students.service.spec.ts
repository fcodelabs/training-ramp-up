import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;
  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: STUDENT_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      STUDENT_REPOSITORY_TOKEN
    );
  });

  describe('Get All students', () => {
    const allStudents = [
      {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    ];

    test('Get All students success', async () => {
      studentRepository.find = jest.fn().mockResolvedValue(allStudents);
      const res: any = await service.findAll();
      expect(res).toEqual(allStudents);
    });

    test('Get all students failed', async () => {
      studentRepository.find = jest.fn().mockRejectedValue(null);
      const res = await service.findAll();
      //expect(res).toThrow(null);
      expect(res).toEqual(null);
    });
  });

  describe('Add Student', () => {
    const newStudent: CreateStudentDto = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Add Student Success', async () => {
      studentRepository.save = jest.fn().mockResolvedValue(newStudent);
      const res: any = await service.create(newStudent);
      expect(res).toEqual(newStudent);
    });
    test('Add Student Fail', async () => {
      studentRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.create(newStudent);
      expect(res).toEqual(null);
    });
  });

  describe('Update Student', () => {
    const newStudent = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '01124455',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Update Student Success', async () => {
      studentRepository.save = jest.fn().mockResolvedValue(newStudent);
      const res = await service.update(newStudent);
      expect(res).toEqual(newStudent);
    });
    test('Update Student Fail', async () => {
      studentRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.update(newStudent);
      expect(res).toEqual(null);
    });
  });

  describe('Delete Student', () => {
    const newStudent = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    test('Delete Student Success', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue(newStudent.id);
      const res: any = await service.remove(newStudent.id);
      expect(res).toEqual(newStudent.id);
    });
    test('Delete Student Fail', async () => {
      studentRepository.delete = jest.fn().mockRejectedValue(null);
      const res = await service.remove(newStudent.id);
      expect(res).toEqual(null);
    });
  });
});
