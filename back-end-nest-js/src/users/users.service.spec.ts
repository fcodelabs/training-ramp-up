/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import User from './entities/users.entity';
import { LoginUserInterface, UserInterface } from './interfaces/users.interface';

describe('User Service Test', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService,
          {
            provide: USER_REPOSITORY_TOKEN,
            useValue: {
              save: jest.fn(),
              findOneBy: jest.fn(),
            },
          },],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  describe('Get User service test', () => {
    const userLoginData: LoginUserInterface = {
      email: 'user@gmail.com',
      password: 'UserPw123.'
    }
  
    const userResult: UserInterface = {
      id: 1,
      userName: 'userName',
      email: 'user@gmail.com',
      password: 'UserPw123.',
      role: 'Admin'
    }

    it('Get User success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(userResult)
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare
      const result = await usersService.getUserService(userLoginData)
      expect(result).toEqual(userResult)
    })
    it('Get User fail with invalid email', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(null)
      // bcrypt.compare = jest.fn().mockResolvedValue(true)
      const result = await usersService.getUserService(userLoginData)
      expect(result).toEqual(null)
    })
    it('Get User fail with invalid password', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(userResult)
      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare      
      const result = await usersService.getUserService(userLoginData)
      expect(result).toEqual(null)
    })
  })

  describe('Add User service test', () => {
    const addUser: UserInterface = {
      userName: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      confirmPassword: 'NewU1234',
      role: 'Admin'
    }

    const addUserResult: UserInterface = {
      id: 1,
      userName: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      confirmPassword: 'NewU1234',
      role: 'Admin'
    }

    it('Add User success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(null)
      userRepository.save = jest.fn().mockResolvedValue(addUserResult)
      const result = await usersService.addUserService(addUser)
      expect(result).toEqual(addUserResult)
    })
    it('Add User fail', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(!null)
      const result = await usersService.addUserService(addUser)
      expect(result).toEqual(false)
    })
  })
});