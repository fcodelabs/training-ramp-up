/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../../entity/user';
import bcrypt = require('bcrypt');
import { Role } from '../../types/role';
import { ForbiddenException } from '@nestjs/common/exceptions';

describe('AuthController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let controller: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

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
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
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
      Role: Role.ADMIN,
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
      expect(response).toEqual({ message: 'sign up successfully' });
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

  describe('Sign in', () => {
    const user: CreateUserDto = {
      Email: 'test@gmail.com',
      Password: '1234',
      Role: Role.ADMIN,
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
    const output = {
      user: {
        Email: 'test@gmail.com',

        Role: Role.ADMIN,
      },
      accessToken: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
      },
    };
    it('Signin success', async () => {
      const response = () => {
        const res = {} as Response;
        res.send = jest.fn().mockReturnValue(res);
        res.cookie = jest.fn().mockReturnValue(res);
        return res;
      };
      const tokens = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
      };
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const spyGetUserByEmail = jest
        .spyOn(authService, 'getUserByEmail')
        .mockResolvedValue(outUser);
      jwtService.signAsync = jest.fn().mockResolvedValue(tokens);
      const res = await controller.loginUser(user, response());
      expect(res).toEqual(output);
      spyGetUserByEmail.mockRestore();
    });
    it('Signin failed', async () => {
      const tokens = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
      };
      const spyGetUserByEmail = jest
        .spyOn(authService, 'getUserByEmail')
        .mockResolvedValue(null);
      jwtService.signAsync = jest.fn().mockResolvedValue(tokens);
      try {
        const res = await controller.loginUser(user, response());
      } catch (err) {
        expect(err).toEqual(new ForbiddenException('Invalid credentials'));
      }
      spyGetUserByEmail.mockRestore();
    });
  });

  describe('refresh token controller', () => {
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
    const user: any = {
      Email: 'test@gmail.com',

      Role: Role.ADMIN,
    };
    const req = {
      user: user,
    };
    const response = () => {
      const res = {} as Response;
      res.send = jest.fn().mockReturnValue(res);
      res.cookie = jest.fn().mockReturnValue(res);
      return res;
    };
    const tokens = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiYWRtaW4iLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NjQyNjYxMiwiZXhwIjoxNjc2NDI2NjE1fQ.txO2YU7rJNVg7D083MBrPd3cTVe1uk4ctLzNcZUPDBg',
    };
    it('refresh token', async () => {
      const spyGetUserByEmail = jest
        .spyOn(authService, 'getUserByEmail')
        .mockResolvedValue(outUser);
      jwtService.signAsync = jest.fn().mockResolvedValue(tokens);
      const res = await controller.refreshToken(req);
      expect(res).toEqual(tokens);
      spyGetUserByEmail.mockRestore();
    });
  });
});
