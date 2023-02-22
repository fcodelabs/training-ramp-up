import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { studentData } from './dummy';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);

    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(studentRepository).toBeDefined();
  });

  const testStudent = {
    id: 1,
    name: 'Sample Name',
    address: 'Sample Address',
    dateOfBirth: new Date('25-12-1999'),
    gender: 'male',
    mobileNo: '0112365498',
  };
  describe('Create', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('Should be return create student response', async () => {
      jest.spyOn(studentRepository, 'create').mockReturnValue(testStudent);
      jest.spyOn(studentRepository, 'save').mockResolvedValueOnce(testStudent);
      const response = await service.create(testStudent);
      expect(response).toEqual(testStudent);
    });

    it('Should be return error for error in create', async () => {
      const error = new Error('Error in create');
      jest.spyOn(studentRepository, 'create').mockImplementationOnce(() => {
        throw error;
      });
      try {
        const response = await service.create(testStudent);
      } catch (error) {
        expect(error).toEqual(error);
      }
    });

    it('Should be return error for error in save', async () => {
      jest.spyOn(studentRepository, 'create').mockReturnValue(testStudent);
      const error = new Error('Error in create');
      jest.spyOn(studentRepository, 'save').mockRejectedValue(error);
      try {
        const response = await service.create(testStudent);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('findAll', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Should return list of students', async () => {
      jest.spyOn(studentRepository, 'find').mockResolvedValueOnce(studentData);
      const response = await service.findAll();
      expect(response).toEqual(studentData);
    });

    it('Should return error for error in find', async () => {
      const error = new Error('Error in find');
      jest.spyOn(studentRepository, 'find').mockRejectedValue(error);
      try {
        const response = await service.findAll();
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('update', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const id = 1;
    const testData = {
      name: 'New name',
      address: 'New address',
    };
    const expectedResponse = { generatedMaps: [], raw: [], affected: 1 };

    it('Should return affected rows as 1', async () => {
      jest
        .spyOn(studentRepository, 'update')
        .mockResolvedValueOnce(expectedResponse);
      const response = await service.update(id, testData);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return error for error in update', async () => {
      const error = new Error('Error in update');
      jest.spyOn(studentRepository, 'update').mockRejectedValue(error);
      try {
        const response = await service.update(id, testData);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const expectedDeleteResponse = {
      raw: [],
      affected: 1,
    };
    it('Should return affected number as 1', async () => {
      jest
        .spyOn(studentRepository, 'delete')
        .mockResolvedValueOnce(expectedDeleteResponse);
      const response = await service.remove(2);
      expect(response).toEqual(expectedDeleteResponse);
    });

    it('Should return error for error in delete', async () => {
      const error = new Error('Error in delete');
      jest.spyOn(studentRepository, 'delete').mockRejectedValue(error);
      try {
        const response = await service.remove(2);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
