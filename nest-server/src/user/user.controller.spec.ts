import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from '../dto/user.dto';

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
            createUser: jest.fn(),
            logUser: jest.fn(),
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
  it('Services should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('Register', () => {
    it(' create user success', async () => {
      const user: Users = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;

      const user1: Users = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(user);
      const res = await controller.create(user1);
      expect(res).toStrictEqual(user);
    });

    it('create user error', async () => {
      const user1: Users = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(null);
      const res = await controller.create(user1);
      expect(res).toStrictEqual(null);
    });
  });

  describe('Login', () => {
    it(' log user success', async () => {
      const user: Users = {
        email: 'test@gmail.com',
        password: 'password',
      } as never;

      const user1: Users = {
        email: 'test@gmail.com',
        password: 'password',
      } as never;
      jest.spyOn(userService, 'logUser').mockResolvedValueOnce(user);
      const res = await controller.logUser(user1);
      expect(res).toEqual(user);
    });

    it('log user error', async () => {
      const user1: Users = {
        email: 'test@gmail.com',
        password: 'password',
      } as never;
      jest.spyOn(userService, 'logUser').mockResolvedValueOnce(null);
      const res = await controller.logUser(user1);
      expect(res).toStrictEqual(undefined);
    });
  });
});
