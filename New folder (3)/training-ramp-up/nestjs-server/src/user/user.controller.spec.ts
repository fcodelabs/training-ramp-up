import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { combineLatest } from 'rxjs';
const jwt = require('jsonwebtoken');
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const userData = [
    {
      name: 'test1',
      email: 'test1@t.com',
      password: 'testpw',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            userRegister: jest.fn((x) => {
              const index = userData
                .map((object) => object.email)
                .indexOf(x.email);
              if (index == -1) {
                userData.push(x);
                return userData;
              } else return null;
            }),
            loginUser: jest.fn((x) => {
              if (x) {
                const index = userData
                  .map((object) => object.email)
                  .indexOf(x.email);

                if (index == -1) {
                  return { user: null };
                } else {
                  return { user: userData[index] };
                }
              } else return null;
            }),
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
      const user = [
        {
          name: 'test1',
          email: 'test1@t.com',
          password: 'testpw',
        },
        {
          name: 'test',
          email: 'test@t.com',
          password: 'testpw',
        },
      ];
      const req = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      };

      const res = await controller.signUp(req);

      expect(res).toStrictEqual(user);
    });
    it('get student fails controller', async () => {
      const req = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      };
      const res = await controller.signUp(req);
      expect(res).toStrictEqual(null);
    });
  });
  describe('Login', () => {
    it(' log user service success', async () => {
      const req = {
        query: {
          email: 'test@t.com',
          password: 'password',
        },
      } as never;

      const user = {
        name: 'test',
        email: 'test@t.com',
        password: 'testpw',
      };

      const res = await controller.signIn(req);
      console.log('RES', res);
      expect(res).toEqual(user);
    });
    it('user login fail', async () => {
      const req = {
        query: {
          email: 'fake@g.com',
          password: '123',
        },
      };

      const res = await controller.signIn(req);
      expect(res).toEqual(undefined);
    });
  });
});
