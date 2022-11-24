import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from '../../utils/config';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined User Service and Repository', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('registerUser', () => {
    const newUser = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
    };

    it('register an user successfully', async () => {
      userRepository.save = jest.fn().mockResolvedValue(newUser);
      const res = await service.createUserService(newUser);
      expect(res).toEqual(newUser);
    });

    it('register user failed', async () => {
      userRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.createUserService(newUser);
      expect(res).toEqual({ err: 'Registration Failed' });
    });
  });

  describe('loginUser', () => {
    const user = {
      id: 1,
      email: 'user@gmail.com',
      password: 'User1234',
    };

    const loginData = {
      email: 'user@gmail.com',
      password: 'User1234',
    };

    it('login user success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      const res = await service.loginUserService(loginData);
      expect(res).toEqual(user);
    });

    it('login user fail', async () => {
      userRepository.findOneBy = jest.fn().mockRejectedValue(null);
      const res = await service.loginUserService(loginData);
      expect(res).toEqual({ err: 'Login Failed' });
    });
  });

  describe('getNewAccessToken', () => {
    const user = {
      id: 1,
      email: 'user@gmail.com',
      password: 'User1234',
      role: 'user',
    };

    const tokenData = {
      email: 'user@gmail.com',
      role: 'user',
    };

    const secret = config.jwt_secret_key;

    const result = {
      newAccessToken: jwt.sign(tokenData, secret, {
        expiresIn: '1h',
      }),
      tokenData: {
        email: 'user@gmail.com',
        role: 'user',
      },
    };

    const refreshToken = 'refreshToken';

    it('get new accessToken success', async () => {
      const jwtVerify = jest.fn().mockResolvedValue(true);
      (jwt.verify as jest.Mock) = jwtVerify;
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      const res = await service.refreshService(refreshToken);
      expect(res).toEqual(result);
    });
    it('get new accessToken fail', async () => {
      const jwtVerify = jest.fn().mockResolvedValue(true);
      (jwt.verify as jest.Mock) = jwtVerify;
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);
      const res = await service.refreshService(refreshToken);
      expect(res).toEqual({ err: 'Cannot Get New Access Token' });
    });
  });
});
