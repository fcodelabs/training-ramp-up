import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
            getUserDetails: jest.fn(),
            refreshToken: jest.fn(),
            signout: jest.fn(),
            validateUser: jest.fn(),
            isUserAlreadyExist: jest.fn(),
          },
        },
        JwtService,
        AuthService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
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
    expect(userService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Sign up', () => {
    const user: CreateUserDto = {
      id: 1,
      name: 'Rashmi',
      username: 'rashi',
      password: '123456',
      role: 'User',
    };

    const insertResult = {
      identifiers: [{ id: 1 }],
      generatedMaps: [{ id: 1 }],
      raw: [{ id: 1 }],
    };

    it('Signup success', async () => {
      const spySignupUser = jest
        .spyOn(userService, 'create')
        .mockResolvedValue(insertResult);
      const response = await controller.create(user);
      expect(response).toEqual(insertResult);
      spySignupUser.mockRestore();
    });

    it('Signup failed', async () => {
      try {
        var spySignupUser = jest
          .spyOn(userService, 'create')
          .mockResolvedValue(null);
        const response = await controller.create(user);
        
      } catch (err) {
        spySignupUser.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Sign in', () => {
    const user = {
      id: 1,
      name: 'Rashmi',
      username: 'rashi',
      password: '123456',
      role: 'User',
    };

    const tokens = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    const req = {
      body: {
        username: 'rashi',
        password: '123456',
      },
    } as Request;

    const res = response();
    it('Signin success', async () => {
      const spyValidateUser = jest
        .spyOn(userService, 'validateUser')
        .mockResolvedValue(user);
      const spyLogin = jest
        .spyOn(authService, 'login')
        .mockResolvedValue(tokens);
      await controller.login(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.send).toHaveBeenCalledWith({ auth: true });
      spyValidateUser.mockRestore();
      spyLogin.mockRestore();
    });

    it('Signin failed', async () => {
      try {
        var spyValidateUser = jest
          .spyOn(userService, 'validateUser')
          .mockRejectedValue(null);
        var spyLogin = jest
          .spyOn(authService, 'login')
          .mockRejectedValue(null);
        await controller.login(req, res);
      } catch (err) {
        spyValidateUser.mockRestore()
        spyLogin.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Get user details', () => {
    const userToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const req = {
      cookies: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    } as Request;

    const res = response();
    it('Get user details success', async () => {
      const spyGetUserDetails = jest
        .spyOn(authService, 'getUserDetails')
        .mockResolvedValue(userToken);

      await controller.getUserDetails(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith('OK');
      spyGetUserDetails.mockRestore();
    });

    it('Get user details failed', async () => {
      try {
        var spyGetUserDetails = jest
          .spyOn(authService, 'getUserDetails')
          .mockRejectedValue(null);

        await controller.getUserDetails(req, res);
      } catch (err) {
        spyGetUserDetails.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Refresh token', () => {
    const tokens = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };

    const req = {
      cookies: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    } as Request;

    const res = response();
    it('Refresh token success', async () => {
      const spyGetNewAccessToken = jest
        .spyOn(authService, 'getNewAccessToken')
        .mockResolvedValue(tokens);
      await controller.refreshToken(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith('OK');
      spyGetNewAccessToken.mockRestore();
    });

    it('Refresh token failed', async () => {
      try {
        var spyGetNewAccessToken = jest
          .spyOn(authService, 'getNewAccessToken')
          .mockRejectedValue(null);
        await controller.refreshToken(req, res);
      } catch (err) {
        spyGetNewAccessToken.mockRestore()
        expect(err).toEqual(null);
      }
    });
  });

  describe('Sign out', () => {
    const req = {} as Request;

    const res = response();
    it('Sign out success', async () => {
      await controller.signout(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(3);
      expect(res.send).toHaveBeenCalledWith({ logOut: true });
    });
  });
});
