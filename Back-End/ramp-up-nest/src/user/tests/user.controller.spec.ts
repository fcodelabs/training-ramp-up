import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('userController', () => {
  let controller: UserController;
  let service: UserService;

  const reqMock = {
    body: {},
    cookies: {},
  } as Request;

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useValue: {
            createUserService: jest.fn((x) => x),
            loginUserService: jest.fn((x) => x),
            createToken: jest.fn((x) => x),
            refreshService: jest.fn((x) => x),
            getLogedUserService: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>('USER_SERVICE');
    controller = module.get<UserController>(UserController);
  });

  it('should be defind User Controller and service', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    const newUser = {
      id: 1,
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      role: 'user',
      createdAt: new Date('2022-10-24 16:59:02.751605'),
      updatedAt: new Date('2022-10-24 16:59:02.751605'),
    } as any;

    const token = {
      newAccessToken: 'accessToken',
      newRefreshToken: 'RefreshToken',
      tokenData: {
        email: 'newUser@gmail.com',
        role: 'user',
      },
    };

    reqMock.body = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
    };

    const resMock = mockResponse();

    it('register user success', async () => {
      jest.spyOn(service, 'createUserService').mockResolvedValue(newUser);
      jest.spyOn(service, 'createToken').mockReturnValue(token);
      await controller.registerUser(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.cookie).toHaveBeenCalledTimes(2);
      expect(resMock.json).toHaveBeenCalledWith(newUser);
    });

    it('register user fail', async () => {
      jest
        .spyOn(service, 'createUserService')
        .mockRejectedValue({ err: 'Registration Failed' });
      await controller.registerUser(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('loginUser', () => {
    const user = {
      id: 1,
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      role: 'user',
      createdAt: new Date('2022-10-24 16:59:02.751605'),
      updatedAt: new Date('2022-10-24 16:59:02.751605'),
    } as User;

    const token = {
      newAccessToken: 'accessToken',
      newRefreshToken: 'RefreshToken',
      tokenData: {
        email: 'newUser@gmail.com',
        role: 'user',
      },
    };

    reqMock.body = {
      email: 'newUser@gmail.com',
      password: 'NewU1234',
    };

    const resMock = mockResponse();

    it('login user success', async () => {
      jest.spyOn(service, 'loginUserService').mockResolvedValue(user);
      jest.spyOn(service, 'createToken').mockReturnValue(token);
      await controller.loginUser(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.cookie).toHaveBeenCalledTimes(2);
      expect(resMock.json).toHaveBeenCalledWith(user);
    });

    it('login user failed', async () => {
      jest
        .spyOn(service, 'loginUserService')
        .mockRejectedValue({ err: 'Login Failed' });
      await controller.loginUser(reqMock.body, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('newAccessToken', () => {
    const token = {
      newAccessToken: 'accessToken',
      tokenData: {
        email: 'newUser@gmail.com',
        role: 'user',
      },
    };

    reqMock.cookies = {
      refreshToken: 'newRefreshToken',
    };

    const resMock = mockResponse();

    it('get new access token success', async () => {
      jest.spyOn(service, 'refreshService').mockResolvedValue(token);
      await controller.refreshUser(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.cookie).toHaveBeenCalledTimes(1);
      expect(resMock.json).toHaveBeenCalledWith(token);
    });

    it('get new access token failed', async () => {
      jest
        .spyOn(service, 'loginUserService')
        .mockRejectedValue({ err: 'Cannot Get New Access Token' });
      await controller.registerUser(reqMock.cookies, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });

  describe('logoutUser', () => {
    const resMock = mockResponse();

    it('successfully logout', () => {
      controller.logoutUser(resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.cookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('getLogedUser', () => {
    const user = {
      id: 1,
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      role: 'user',
      createdAt: new Date('2022-10-24 16:59:02.751605'),
      updatedAt: new Date('2022-10-24 16:59:02.751605'),
    };

    reqMock.cookies = {
      accessToken: 'accessToken',
    };

    const resMock = mockResponse();

    it('get loged user Success', async () => {
      jest.spyOn(service, 'getLogedUserService').mockResolvedValue(user);
      await controller.getLogedUser(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith(user);
    });

    it('get loged user failed', async () => {
      jest
        .spyOn(service, 'getLogedUserService')
        .mockRejectedValue({ err: 'Cannot find User' });
      await controller.getLogedUser(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(400);
    });
  });
});
