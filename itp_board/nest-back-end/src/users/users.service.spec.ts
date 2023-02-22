import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const testUser = {
      email: 'test@gmail.com',
      firstName: 'test first name',
      lastName: 'test last name',
      password: 'Abcd@1234',
      admin: false,
    };

    const expectedResponse = {
      email: 'test@gmail.com',
      firstName: 'test first name',
      lastName: 'test last name',
      admin: false,
    };

    const expectedSaveResponse = {
      email: 'test@gmail.com',
      firstName: 'test first name',
      lastName: 'test last name',
      password: 'hashed_password',
      admin: false,
    };

    it('Should response user object without password', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((pass, salt) => 'hashed_password');
      jest.spyOn(userRepository, 'create').mockReturnValue(testUser);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(expectedSaveResponse);
      const response = await service.create(testUser);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return HTTP bad request for used email', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(expectedSaveResponse);
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((pass, salt) => 'hashed_password');
      jest.spyOn(userRepository, 'create').mockReturnValue(testUser);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(expectedSaveResponse);
      try {
        const response = await service.create(testUser);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Already used email.');
      }
    });

    it('Should return error for error in hash function', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(expectedSaveResponse);

      const error = new Error('Error in hash');
      jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => error);
      jest.spyOn(userRepository, 'create').mockReturnValue(testUser);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(expectedSaveResponse);
      try {
        const response = await service.create(testUser);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });

    it('Should return error for error in create function', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(expectedSaveResponse);

      const error = new Error('Error in create');
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((pass, salt) => 'hashed_password');
      jest.spyOn(userRepository, 'create').mockImplementation(() => {
        throw error;
      });
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(expectedSaveResponse);
      try {
        const response = await service.create(testUser);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });

    it('Should return error for error in save function', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(expectedSaveResponse);

      const error = new Error('Error in create');
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation((pass, salt) => 'hashed_password');
      jest.spyOn(userRepository, 'create').mockReturnValue(testUser);
      jest.spyOn(userRepository, 'save').mockRejectedValue(error);
      try {
        const response = await service.create(testUser);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const expectedResponse = {
      email: 'test@gmail.com',
      firstName: 'test first name',
      lastName: 'test last name',
      password: 'hashed_password',
      admin: false,
    };

    it('Should return user', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(expectedResponse);
      const response = await service.findOne(expectedResponse.email);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return user', async () => {
      const error = new Error('Error in findOneBy');
      jest.spyOn(userRepository, 'findOneBy').mockRejectedValue(error);
      try {
        const response = await service.findOne(expectedResponse.email);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
