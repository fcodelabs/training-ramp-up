import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from '../dto/student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
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

  describe('Get Student', () => {
    it('it should get all student', async () => {
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
      jest.spyOn(studentRepository, 'find').mockResolvedValueOnce(student);
      const res = await service.getAll();
      expect(res).toEqual(student);
    });
    it('it must student get error', async () => {
      jest.spyOn(studentRepository, 'find').mockResolvedValueOnce(null);
      const res = await service.getAll();
      expect(res).toEqual(null);
    });
  });

  describe('Create Student', () => {
    it('it should create success', async () => {
      const student_02 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      const student_01: Students = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(student_02);
      const res = await service.createPost(student_01);
      expect(res).toEqual(student_02);
    });
    it('it must error', async () => {
      const student_01: Students = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(null);
      const res = await service.createPost(student_01);
      expect(res).toEqual(null);
    });
  });
  describe('Delete Student', () => {
    it('it should delete success', async () => {
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
      jest.spyOn(studentRepository, 'delete').mockResolvedValueOnce(student1);
      const res = await service.deleteOne(req);
      expect(res).toEqual(student1);
    });
    it('it must deleteerror', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;
      jest.spyOn(studentRepository, 'delete').mockResolvedValueOnce(null);
      const res = await service.deleteOne(req);
      expect(res).toEqual(null);
    });
  });

  describe('Update Student', () => {
    it('it should Update success', async () => {
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
      jest.spyOn(studentRepository, 'update').mockResolvedValueOnce(student1);
      const res = await service.updateStudent(req, student2);
      expect(res).toEqual(student1);
    });
    it('it must update error', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
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
      jest.spyOn(studentRepository, 'update').mockResolvedValueOnce(null);
      const res = await service.updateStudent(req, student2);
      expect(res).toEqual(null);
    });
  });
});
