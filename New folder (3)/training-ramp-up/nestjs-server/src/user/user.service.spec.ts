import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import { getRepositoryToken } from '@nestjs/typeorm';
const jwt = require('jsonwebtoken');
import { UserDto } from '../dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  const user = [
    {
      id: 1,
      name: 'test',
      email: 'test@gmail.com',
      password: 'password',
      role: 'User',
    },
    {
      id: 2,
      name: 'test',
      email: 'test@t.com',
      password: 'password',
      role: 'User',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),

          useValue: {
            save: jest.fn((x) => {
              if (!x) {
                return null;
              } else {
                const length = user.length;
                x['id'] = length + 1;
                x['role'] = 'User';
                user.push(x);
                return user;
              }
            }),
            findOneBy: jest.fn((x) => {
              const index = user.map((object) => object.email).indexOf(x.email);
              if (index == -1) {
                return null;
              } else {
                return user[index];
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });
  describe('log User', () => {
    // it('it should log success', async () => {
    //   const user = {
    //     id: 1,
    //     name: 'test',
    //     email: 'test@gmail.com',
    //     password: 'password',
    //     role: 'user',
    //     // accessToken: await Promise {},
    //   };

    //   const req = {
    //     email: 'test@gmail.com',
    //     password: 'password',
    //   };

    //   // jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user_02);
    //   jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
    //   await jest.spyOn(jwt, 'sign').mockResolvedValueOnce(user);
    //   const res = await service.loginUser(req);
    //   expect(res).toStrictEqual(user);
    // });
    it('uesr must save', async () => {
      const req = {
        email: 'test@gmail.com',
        password: 'password',
      };
      const userData = {
        email: 'test@gmail.com',
        password: 'password',
        id: 1,
        role: 'User',
        name: 'test',
      };
      const res = await userRepository.findOneBy(req);
      expect(res).toEqual(userData);
    });
    it('user save fails', async () => {
      const req = {
        email: 'fake@gmail.com',
        password: 'password',
      };
      const res = await userRepository.findOneBy(req);
      expect(res).toEqual(null);
    });
    it('user service save fails', async () => {
      const req = {
        email: 'fake@gmail.com',
        password: 'password',
      };

      const res = await service.loginUser(req);
      console.log('Res', res);
      expect(res).toEqual(undefined);
    });
  });
  describe(' User Register', () => {
    // it('it should log success', async () => {
    //   const userData = [
    //     {
    //       email: 'test@gmail.com',
    //       id: 1,
    //       name: 'test',
    //       password: 'password',
    //       role: 'User',
    //     },
    //     {
    //       email: 'test@t.com',
    //       id: 2,
    //       name: 'test',
    //       password: 'password',
    //       role: 'User',
    //     },
    //     {
    //       email: 'fake@t.com',
    //       id: 3,
    //       name: 'test',
    //       password: 'password',
    //       role: 'User',
    //     },
    //   ];
    //   const req = {
    //     name: 'test',
    //     email: 'fake@t.com',
    //     password: 'password',
    //   };

    //   jest.spyOn(bcrypt, 'hashSync').mockResolvedValue('password');
    //   jest.spyOn(bcrypt, 'genSaltSync').mockResolvedValue('pwd');
    //   const res = await service.userRegister(req);
    //   expect(res).toEqual(userData);
    // });
    it('user must register', async () => {
      const req = {
        name: 'test',
        email: 'fakeadd@t.com',
        password: 'password',
      };
      const user = [
        {
          id: 1,
          name: 'test',
          email: 'test@gmail.com',
          password: 'password',
          role: 'User',
        },
        {
          id: 2,
          name: 'test',
          email: 'test@t.com',
          password: 'password',
          role: 'User',
        },
        {
          name: 'test',
          email: 'fakeadd@t.com',
          password: 'password',
          id: 3,
          role: 'User',
        },
      ];

      const res = await userRepository.save(req);
      console.log('Res', res);
      expect(res).toEqual(user);
    });
    it('user register fails', async () => {
      const req = null;
      const res = await userRepository.save(req);
      expect(res).toEqual(null);
    });
    it('user register service fails', async () => {
      const req = {
        name: 'test',
        email: 'fakeadd@t.com',
        password: 'password',
      };
      const res = await service.userRegister(req);
      console.log('Res', res);
      expect(res).toEqual({ error: 'user was here' });
    });
  });
});
