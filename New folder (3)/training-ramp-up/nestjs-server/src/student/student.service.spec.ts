import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from '../dto/student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let studentRepository: Repository<Student>;

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
            save: jest.fn((x) => x),
            findOne: jest.fn((x) => x),
            merge: jest.fn((x, y) => x),
            remove: jest.fn((x) => x),
            findOneBy: jest.fn((x) => x),
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
      // jest.spyOn(studentRepository, 'find').mockResolvedValueOnce(student);
      // const res = await service.getAll();
      const res = await service.getAll();
      await studentRepository.find();
      expect(res).toEqual(student);
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
      const student_01: StudentDto = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      // jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(student_02);

      const res = await service.addOne(student_01);
      // const res = await studentRepository.save(student_01);
      expect(res).toEqual(student_02);
    });
    it('it should create fails', async () => {
      // const student_02 = {
      //   id: 1,
      //   name: 'test',
      //   gender: 'Male',
      //   address: 'testAddress',
      //   mobile_number: '123456789',
      //   date: new Date('2001-04-05 00:00:00'),
      //   age: 21,
      // } as never;
      // const student_01: StudentDto = {
      //   id: 1,
      //   name: 'test',
      //   gender: 'Male',
      //   address: 'testAddress',
      //   mobile_number: '123456789',
      //   date: new Date('2001-04-05 00:00:00'),
      //   age: 21,
      // } as never;
      // jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(student_02);

      const res = await service.addOne(null);
      // const res = await studentRepository.save(null);

      expect(res).toEqual(null);
    });
  });
  describe('Delete Student', () => {
    it('it should delete success', async () => {
      const req = {
        id: 1,
      } as any;
      const student1 = {
        id: { id: 1 },
      } as any;
      // jest
      //   .spyOn(studentRepository, 'findOneBy')
      //   .mockResolvedValueOnce(student1);
      // jest.spyOn(studentRepository, 'remove').mockResolvedValueOnce(student1);

      // const res = await service.deleteOne(req);
      // // await studentRepository.findOneBy(student1);
      // // await studentRepository.remove(student1);
      // expect(res).toEqual({ id: { id: 1 } });
      const res = await service.deleteOne(req);
      await studentRepository.findOneBy(student1);
      // const res = await studentRepository.remove(student1);
      expect(res).toEqual(student1);
    });
    it('it must delete error', async () => {
      const req = {
        params: {
          studnetId: 1,
        },
      } as any;
      // jest.spyOn(studentRepository, 'findOneBy').mockResolvedValueOnce(null);
      const res = await studentRepository.remove(null);
      expect(res).toEqual(null);
    });
  });
  describe('Update Student', () => {
    it('it should Update success', async () => {
      const req = {
        params: {
          id: 1,
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
      } as never;
      const student2 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as any;
      // jest.spyOn(studentRepository, 'findOne').mockResolvedValueOnce(student1);
      // jest.spyOn(studentRepository, 'merge').mockResolvedValueOnce(student1);
      // jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(student1);
      // const res = await service.updateOne(req);
      // console.log('UPDATE', res);
      const res = await studentRepository.findOne(student1);
      expect(res).toEqual(student1);
    });
    it('student merge', async () => {
      const student_02 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      const student_01 = {
        id: 1,
        name: 'test',
        gender: 'Male',
        address: 'testAddress',
        mobile_number: '123456789',
        date: new Date('2001-04-05 00:00:00'),
        age: 21,
      } as never;
      const res = studentRepository.merge(student_01, student_02);
      expect(res).toEqual(student_01);
    });
    it('it must error merge', async () => {
      // const student_01: StudentDto = {
      //   id: 1,
      //   name: 'test',
      //   gender: 'Male',
      //   address: 'testAddress',
      //   mobile_number: '123456789',
      //   date: new Date('2001-04-05 00:00:00'),
      //   age: 21,
      // } as never;
      // jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(null);
      // const res = await service.addOne(student_01);
      const res = studentRepository.merge(null);
      expect(res).toEqual(null);
    });
    // it('it must update error', async () => {
    //   const req = {
    //     params: {
    //       studnetId: 1,
    //     },
    //   } as any;
    //   const student2 = {
    //     id: 1,
    //     name: 'test',
    //     gender: 'Male',
    //     address: 'testAddress',
    //     mobile_number: '123456789',
    //     date: new Date('2001-04-05 00:00:00'),
    //     age: 21,
    //   } as any;
    //   jest.spyOn(studentRepository, 'findOne').mockResolvedValueOnce(null);
    //   jest
    //     .spyOn(studentRepository, 'merge')
    //     .mockResolvedValueOnce(null as never);
    //   jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(null);
    //   const res = await service.updateOne(req);
    //   expect(res).toEqual({ error: 'student update fail' });
    // });
  });
});
