import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Request, Response } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
// import { RolesGuard } from 'src/auth/auth.guard';
// import { AuthModule } from 'src/auth/auth.module';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [AuthModule],
      controllers: [StudentsController],
      providers: [
        StudentsService,
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<StudentsService>(StudentsService);
    controller = module.get<StudentsController>(StudentsController);
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Get All Student', () => {
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

    const req = {} as Request;
    const res = mockResponse();

    test('Get All Student Success', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(allStudents);
      await controller.findAll(res);
      expect(res.send).toHaveBeenCalledWith(allStudents);
      spyGetStudents.mockRestore();
    });

    test('Get All Student Fail', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(null);
      await controller.findAll(res);
      expect(res.send).toHaveBeenCalledWith(false);
      spyGetStudents.mockRestore();
    });
  });

  describe('Add Student', () => {
    const newStudent = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    const req = {
      body: {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    } as Request;
    const res = mockResponse();

    test('Add new Student Success', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'create')
        .mockResolvedValue(newStudent);
      await controller.create(req.body, res);
      expect(res.send).toHaveBeenCalledWith(newStudent);
      spyGetStudents.mockRestore();
    });

    test('Add new Student Fail', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'create')
        .mockRejectedValue(null);
      await controller.create(req.body, res);
      expect(res.send).toHaveBeenCalledWith(false);
      spyGetStudents.mockRestore();
    });
  });

  describe('Update Student', () => {
    const newStudent = {
      name: 'dilshan',
      gender: 'Male',
      address: 'colombo6',
      mobileNo: '011244',
      birth: new Date(2 / 24 / 2003),
      age: 22,
      id: 1,
    };
    const req = {
      body: {
        name: 'dilshan',
        gender: 'Male',
        address: 'colombo6',
        mobileNo: '011244',
        birth: new Date(2 / 24 / 2003),
        age: 22,
        id: 1,
      },
    } as Request;
    const res = mockResponse();

    test('Update Student Success', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'update')
        .mockResolvedValue(newStudent);
      await controller.update(req.body, res);
      expect(res.send).toHaveBeenCalledWith(newStudent);
      spyGetStudents.mockRestore();
    });

    test('Update Student Fail', async () => {
      const spyGetStudents = jest
        .spyOn(service, 'update')
        .mockRejectedValue(null);
      await controller.update(req.body, res);
      expect(res.send).toHaveBeenCalledWith(false);
      spyGetStudents.mockRestore();
    });
  });

  describe('Delete Student', () => {
    const id = 1 as any;

    const req = {
      params: {
        studentId: 1,
      },
    } as any;

    const res = mockResponse();

    test('Delete Student Success', async () => {
      const spyDeleteStudent = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(id);
      await controller.remove(req, res);
      expect(res.send).toHaveBeenCalledWith(id);
      spyDeleteStudent.mockRestore();
    });

    test('Delete Student Fail', async () => {
      const spyDeleteStudent = jest
        .spyOn(service, 'remove')
        .mockRejectedValue(null);
      await controller.remove(req, res);
      expect(res).toThrowError;
      spyDeleteStudent.mockRestore();
    });
  });
});
