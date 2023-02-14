/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Role, User } from '../../entity/user';
import bcrypt = require('bcrypt');

describe('AuthController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signUpUser: jest.fn(),
            getUserByEmail: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });
  const response = () => {
    const res = {} as Response;
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Sign up', () => {
    const user: CreateUserDto = {
      Email: 'test@gmail.com',
      Password: '1234',
      Role: 'admin',
    };

    const outUser: User = {
      Email: 'test@gmail.com',
      Password: '$2b$10$N/Bt000zfBw745V2/czYLuPRacADdO8X.oQd/8Xg5tSnodcJf4Zya',
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
    const hashPassword =
      '$2b$10$N/Bt000zfBw745V2/czYLuPRacADdO8X.oQd/8Xg5tSnodcJf4Zya';
    it('Signup success', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue(hashPassword);
      const spySignupUser = jest
        .spyOn(authService, 'signUpUser')
        .mockResolvedValue(outUser);
      const response = await controller.signUpUser(user);
      expect(response).toEqual(outUser);
      spySignupUser.mockRestore();
    });

    it('Signup failed', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue(hashPassword);
      const spySignupUser = jest
        .spyOn(authService, 'signUpUser')
        .mockResolvedValue(null);
      try {
        const response = await controller.signUpUser(user);
      } catch (err) {
        expect(err).toEqual(null);
      }
      spySignupUser.mockRestore();
    });
  });
});
