import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import bcrypt = require('bcrypt');
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Add user', () => {
    const user: CreateUserDto = {
      id: 1,
      name: 'Rashmi',
      username: 'rashin',
      password: '123456',
      role: 'User',
    };

    const insertResult = {
      identifiers: [{ id: 1 }],
      generatedMaps: [{ id: 1 }],
      raw: [{ id: 1 }],
    };

    const hashPassword =
      '$2y$10$xIBKK7P8iCFozE.ydnXlTOrJPZl7GzdfnGcuiV/R6CRjojyWU2Bn2';

    it('Add user success', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue(hashPassword);
      userRepository.insert = jest.fn().mockResolvedValue(insertResult);
      const res = await service.create(user);
      expect(res).toEqual(insertResult);
    });

    it('Add user failed', async () => {
      try {
        bcrypt.hash = jest.fn().mockResolvedValue(hashPassword);
        userRepository.insert = jest.fn().mockRejectedValue(null);
        const res = await service.create(user);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Is user already exists', () => {
    const user: User = {
      id: 1,
      name: 'Rashmi',
      username: 'rashin',
      password: '123456',
      role: 'User',
    };
    const username = 'rashi';
    const userAlreadyExistsExp = new BadRequestException('User already exists');

    it('User does not exists success', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      const res = await service.isUserAlreadyExist(username);
      expect(res).toEqual(false);
    });

    it('User already exists success', async () => {
      try {
        userRepository.findOne = jest.fn().mockResolvedValue(user);
        const res = await service.isUserAlreadyExist(username);
      } catch (err) {
        expect(err).toEqual(userAlreadyExistsExp);
      }
    });

    it('Is user already exists failed', async () => {
      try {
        userRepository.findOne = jest.fn().mockRejectedValue(null);
        const res = await service.isUserAlreadyExist(username);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Validate user', () => {
    const user: User = {
      id: 1,
      name: 'Rashmi',
      username: 'rashin',
      password: '123456',
      role: 'User',
    };

    const username = 'rashi';
    const password = '123456';
    const wrongpassword = '12345';

    const incorrectPasswordExp = new NotFoundException('Incorrect Password');
    const userNotFoundExp = new NotFoundException('User not found');

    it('Validate user success', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const res = await service.validateUser(username, password);
      expect(res).toEqual(user);
    });

    it('User not found', async () => {
      try {
        userRepository.findOne = jest.fn().mockResolvedValue(null);
        const res = await service.validateUser(username, password);
      } catch (err) {
        expect(err).toEqual(userNotFoundExp);
      }
    });

    it('Incorrect password', async () => {
      try {
        userRepository.findOne = jest.fn().mockResolvedValue(user);
        bcrypt.compare = jest.fn().mockResolvedValue(false);
        const res = await service.validateUser(username, wrongpassword);
      } catch (err) {
        expect(err).toEqual(incorrectPasswordExp);
      }
    });

    it('Validate user failed', async () => {
      try {
        userRepository.findOne = jest.fn().mockRejectedValue(null);
        const res = await service.validateUser(username, wrongpassword);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });
});
