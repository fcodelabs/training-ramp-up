import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { GatewayService } from '../gateway/gateway.service';
import { studentData } from './dummy';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;
  let gateWayService: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: GatewayService,
          useValue: {
            sendNew: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    gateWayService = module.get<GatewayService>(GatewayService);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(gateWayService).toBeDefined();
  });

  describe('create', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const testStudent = {
      id: 1,
      name: 'Sample Name',
      address: 'Sample Address',
      dateOfBirth: new Date('25-12-1999'),
      gender: 'male',
      mobileNo: '0112365498',
    };

    it('Should return student', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(testStudent);
      const emit = jest.spyOn(gateWayService, 'sendNew');
      const response = await controller.create(testStudent);
      expect(response).toEqual(testStudent);
      expect(emit).toHaveBeenCalledTimes(1);
    });

    it('Should return error for error in create method', async () => {
      const error = new Error('Error in create');
      jest.spyOn(service, 'create').mockRejectedValue(error);
      const emit = jest.spyOn(gateWayService, 'sendNew');
      try {
        const response = await controller.create(testStudent);
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
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(studentData);
      const response = await controller.findAll();
      expect(response).toEqual(studentData);
    });

    it('Should return error for error in findAll', async () => {
      const error = new Error('Error in findAll');
      jest.spyOn(service, 'findAll').mockRejectedValue(error);
      try {
        const response = await controller.findAll();
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const expectedResponse = { generatedMaps: [], raw: [], affected: 1 };
    const testData = {
      id: 1,
      name: 'New name',
      address: 'New address',
    };
    it('Should return expected as 1', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResponse);
      jest.spyOn(gateWayService, 'sendNew');
      const response = await controller.update(testData);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return error for error in update method', async () => {
      const error = new Error('Error in update');
      jest.spyOn(service, 'update').mockRejectedValue(error);
      jest.spyOn(gateWayService, 'sendNew');
      try {
        const response = await controller.update(testData);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });

    const expectedDeleteResponse = {
      raw: [],
      affected: 1,
    };
    it('Should return affected as 1', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce(expectedDeleteResponse);
      jest.spyOn(gateWayService, 'sendNew');
      const response = await controller.remove(1);
      expect(response).toEqual(expectedDeleteResponse);
    });

    it('Should return affected as 1', async () => {
      const error = new Error('Error in remove');
      jest.spyOn(service, 'remove').mockRejectedValue(error);
      jest.spyOn(gateWayService, 'sendNew');
      try {
        const response = await controller.remove(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
