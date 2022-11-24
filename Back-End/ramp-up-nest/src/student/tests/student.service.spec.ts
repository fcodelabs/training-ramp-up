import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;

  const STUDENT_REPOSITORY_TOKEN = getRepositoryToken(Student);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
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

    service = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      STUDENT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined Student Service and Repository', () => {
    expect(service).toBeDefined();
    expect(studentRepository).toBeDefined();
  });

  describe('getStudents', () => {
    const allStudents = [
      {
        id: 1,
        name: 'newName1',
        gender: 'Male',
        address: 'newAddress1',
        mobile: 112463256,
        birthday: '1999-10-10',
        age: 23,
      },
    ];
    it('successfully get students', async () => {
      studentRepository.find = jest.fn().mockResolvedValue(allStudents);
      const res = await service.getAllStudentService();
      expect(res).toEqual(allStudents);
    });

    it('get all students fail', async () => {
      studentRepository.find = jest.fn().mockRejectedValue(null);
      const res = await service.getAllStudentService();
      expect(res).toEqual({ err: 'Students are not Found' });
    });
  });

  describe('addStudent', () => {
    const addNewStudent = {
      name: 'newName',
      gender: 'Male',
      address: 'newAddress',
      mobile: 112463268,
      birthday: '1997-11-15',
      age: 25,
    };

    it('add new student success', async () => {
      studentRepository.save = jest.fn().mockResolvedValue(addNewStudent);
      const res = await service.createStudentService(addNewStudent);
      expect(res).toEqual(addNewStudent);
    });

    it('add new student fail', async () => {
      studentRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.createStudentService(addNewStudent);
      expect(res).toEqual({ err: 'Student adding Failed' });
    });
  });

  describe('updateStudent', () => {
    const findStudent = {
      id: 1,
      name: 'newName1',
      gender: 'Male',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    const changesStudent = {
      name: 'newName1',
      gender: 'Female',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    const id = 1;

    it('update student succesfully', async () => {
      studentRepository.findOneBy = jest.fn().mockResolvedValue(findStudent);
      studentRepository.merge = jest.fn().mockResolvedValue(changesStudent);
      studentRepository.save = jest.fn().mockResolvedValue(changesStudent);
      const res = await service.updateStudentService(changesStudent, id);
      expect(res).toEqual(changesStudent);
    });

    it('update student fail', async () => {
      studentRepository.findOneBy = jest.fn().mockResolvedValue(findStudent);
      studentRepository.merge = jest.fn().mockResolvedValue(null);
      studentRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.updateStudentService(changesStudent, id);
      expect(res).toEqual({ err: 'Cannot Update Student' });
    });
  });

  describe('deleteStudent', () => {
    const deleteStudent = {
      id: 1,
      name: 'newName1',
      gender: 'Male',
      address: 'newAddress1',
      mobile: 112463256,
      birthday: '1999-10-10',
      age: 23,
    };

    const id = 1;

    it('delete s student successfully', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue(deleteStudent);
      const res = await service.deleteStudentService(id);
      expect(res).toEqual(deleteStudent);
    });

    it('fail delete student', async () => {
      studentRepository.delete = jest.fn().mockRejectedValue(null);
      const res = await service.deleteStudentService(id);
      expect(res).toEqual({ err: 'Error with Deleting Student' });
    });
  });
});
