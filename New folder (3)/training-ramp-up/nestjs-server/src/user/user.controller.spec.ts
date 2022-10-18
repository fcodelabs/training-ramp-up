import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
const jwt = require('jsonwebtoken');
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            userRegister: jest.fn((x) => x),
            loginUser: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  describe('user Register', () => {
    it('get user success controller', async () => {
      const user = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      } as any;

      const res = await controller.signUp(user);
      expect(res).toStrictEqual(user);
    });
    it('get student fails controller', async () => {
      const res = await controller.signUp(null);
      expect(res).toStrictEqual(null);
    });
    it('get user success userService', async () => {
      const user = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      } as any;
      const res = await userService.userRegister(user);
      expect(res).toStrictEqual(user);
    });
    it('get user success userService', async () => {
      const user = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      } as any;
      const res = await userService.userRegister(null);
      expect(res).toStrictEqual(null);
    });
  });
  describe('Login', () => {
    it(' log user service success', async () => {
      const user = {
        query: {
          email: 'test@gmail.com',
          password: 'password',
        },
      } as never;

      const res = await userService.loginUser(user);
      expect(res).toEqual(user);
    });

    it('log user service  error', async () => {
      const res = await userService.loginUser(null);
      expect(res).toStrictEqual(null);
    });
    it('log user  controller success', async () => {
      const user = {
        query: {
          name: 'test',
          email: 'test@t.com',
          password: 'testpw',
        },
      } as any;
      const userDetails = {
        user: {
          name: 'test',
          email: 'test@t.com',
          password: 'testpw',
        },
      } as any;
      const resUser = {
        email: 'test@t.com',
        name: 'test',
        password: 'testpw',
      };
      // await userService.loginUser(userDetails);
      jest.spyOn(userService, 'loginUser').mockResolvedValue(userDetails);
      jest.spyOn(jwt, 'sign').mockResolvedValue(user);
      const res = await controller.signIn(user);
      await expect(res.email).toBe(resUser.email);
    });

    it('log user controller fail', async () => {
      const res = await controller.signIn(null);
      expect(res).toStrictEqual(undefined);
    });
  });
});
