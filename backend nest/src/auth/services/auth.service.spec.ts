/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Role, User } from '../../entity/user';
import { CreateUserDto } from '../dtos/createUser.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Add user', () => {
    const user: CreateUserDto = {
      Email: 'test',
      Password: '$2y$10$xIBKK7P8iCFozE.ydnXlTOrJPZl7GzdfnGcuiV/R6CRjojyWU2Bn2',
      Role: 'admin',
    };

    const insertResult = {
      identifiers: [{ id: 1 }],
      generatedMaps: [{ id: 1 }],
      raw: [{ id: 1 }],
    };

    it('Add user success', async () => {
      userRepository.save = jest.fn().mockResolvedValue(insertResult);
      const res = await service.signUpUser(user);
      expect(res).toEqual(insertResult);
    });

    it('Add user failed', async () => {
      try {
        userRepository.save = jest.fn().mockRejectedValue(null);
        const res = await service.signUpUser(user);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });

  describe('Is user already exists', () => {
    const user: CreateUserDto = {
      Email: 'test',
      Password: '$2y$10$xIBKK7P8iCFozE.ydnXlTOrJPZl7GzdfnGcuiV/R6CRjojyWU2Bn2',
      Role: 'admin',
    };

    const userAlreadyExistsExp = new BadRequestException('User already exists');

    it('User does not exists success', async () => {
      userRepository.save = jest.fn().mockResolvedValue(userAlreadyExistsExp);
      try {
        const res = await service.signUpUser(user);
      } catch (err) {
        expect(err).toEqual(userAlreadyExistsExp);
      }
    });
  });

  describe('find by email', () => {
    const email = 'test@gmail.com';
    const user: User = {
      Email: 'test',
      Password: '$2y$10$xIBKK7P8iCFozE.ydnXlTOrJPZl7GzdfnGcuiV/R6CRjojyWU2Bn2',
      Role: Role.ADMIN,
      UserID: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      RefreshToken: '',
      Provider: '',
      hashPassword: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    };

    it('find by email success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      const res = await service.getUserByEmail(email);
      expect(res).toEqual(user);
    });
    it('find by email fail', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);
      try {
        const res = await service.getUserByEmail(email);
      } catch (err) {
        expect(err).toEqual(null);
      }
    });
  });
});
