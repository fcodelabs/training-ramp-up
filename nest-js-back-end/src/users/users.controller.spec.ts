import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            getTokens: jest.fn(),
            getAccessToken: jest.fn(),
            verifyRefresh: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  const response = () => {
    const res = {} as Response;
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Register User', () => {
    const newUser = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'New1234',
      userRoll: 'User',
      id: 0,
    };
    const req = {
      body: {
        name: 'newUser',
        email: 'newUser@gmail.com',
        password: 'NewU1234',
      },
    } as Request;

    const res = response();

    it('Register User Success', async () => {
      const spyRegisterUser = jest
        .spyOn(service, 'create')
        .mockResolvedValue(newUser);
      await controller.create(req.body, res);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.send).toHaveBeenCalledWith(true);
      spyRegisterUser.mockRestore();
    });

    test('Register User Fail', async () => {
      const spyRegisterUser = jest
        .spyOn(service, 'create')
        .mockResolvedValue(null);
      await controller.create(req.body, res);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.send).toHaveBeenCalledWith(false);
      spyRegisterUser.mockRestore();
    });
  });

  describe('Login User', () => {
    const user: CreateUserDto = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'New1234',
      userRoll: 'User',
      id: 0,
    };
    const req = {
      body: {
        email: 'newUser@gmaill.com',
        password: 'NewU1234',
      },
    } as Request;

    const res = response();

    test('Login User Success', async () => {
      const spyLoginUser = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(user);
      await controller.findOne(req.body, res);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.send).toHaveBeenCalledWith(true);
      spyLoginUser.mockRestore();
    });

    test('Login User Fail', async () => {
      const spyLoginUser = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(null);
      await controller.findOne(req.body, res);
      expect(res.send).toHaveBeenCalledWith(false);
      spyLoginUser.mockRestore();
    });
  });

  describe('Logout User', () => {
    const req = {} as Request;

    const res = response();

    test('Sign out success', async () => {
      await controller.logout(res);

      expect(res.cookie).toHaveBeenCalledTimes(3);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });
});
