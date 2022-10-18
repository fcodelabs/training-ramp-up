import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserDto } from '../dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),

          useValue: {
            findOneBy: jest.fn((x) => x),
            save: jest.fn((x) => x),
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
    it('it should log success', async () => {
      const user_02 = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      const user_01 = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      // jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user_02);
      // const res = await service.loginUser(user_01);
      const res = await userRepository.findOneBy(user_02);
      expect(res).toStrictEqual(user_02);
      // jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(user_02);
      // const res = await service.loginUser(user_01);
    });
    it('it must save', async () => {
      const user1 = {
        email: 'test@gmail.com',
        password: 'password',
      } as never;
      // jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
      const res = await userRepository.save(user1);
      // const res = await service.loginUser(user1);
      expect(res).toEqual(user1);
    });
  });
  // describe(' User Register', () => {
  //   it('it should log success', async () => {
  //     const user_02 = {
  //       name: 'test',
  //       email: 'test@gmail.com',
  //       password: 'password',
  //       role: 'User',
  //     } as never;
  //     const user_01 = {
  //       name: 'test',
  //       email: 'test@gmail.com',
  //       password: 'password',
  //     } as never;
  //     // jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
  //     // const user = await userRepository.findOneBy(null);
  //     jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(user_02);
  //     // await userRepository.save(user_02);
  //     const res = await service.userRegister(user_01);
  //     expect(res).toEqual(user_02);
  //   });
  //   // it('it must error', async () => {
  //   //   const user1 = {
  //   //     email: 'test@gmail.com',
  //   //     password: 'password',
  //   //   } as never;
  //   //   await userRepository.findOneBy(null);
  //   //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(null);
  //   //   await userRepository.save(null);
  //   //   const res = await service.userRegister(user1);
  //   //   expect(res).toEqual(undefined);
  //   // });
  // });
});
