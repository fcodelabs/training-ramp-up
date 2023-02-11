import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../models/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should return a user if sign up is successful', async () => {
      const user: UserDto = {
        email: 'test@example.com',
        password: 'test-password',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue(
          '$2b$10$uvjtKPzHHjWFnxMxZd80G.N8DRUZjqV2u5aZPlJ0ISgWhS0vLLOZK' as never,
        );
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...user,
        password: 'hashedpassword',
      });

      const result = await service.signUp(user);
      expect(result).toEqual({
        email: 'test@example.com',
      });
    });

    it('should throw an error if user already exists', async () => {
      const user: UserDto = {
        email: 'user@gmail.com',
        password: 'test-password',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      try {
        await service.signUp(user);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('User already exists');
      }
    });

    it('should throw an error if there is a problem with the repository', async () => {
      try {
        await service.signUp({} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual(
          'Cannot convert undefined or null to object',
        );
      }
    });
  });

  describe('signIn', () => {
    it('should return a user if sign in is successful', async () => {
      const user: UserDto = {
        email: 'user@gmail.com',
        password: 'test-password',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      const result = await service.signIn(user);
      expect(result).toEqual({
        email: 'user@gmail.com',
      });
    });

    it('should throw an error if user does not exist', async () => {
      const user: UserDto = {
        email: 'user@gmail.com',
        password: 'test-password',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      try {
        await service.signIn(user);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('User does not exist');
      }
    });

    it('should throw an error if password is incorrect', async () => {
      const user: UserDto = {
        email: 'user@gmail.com',
        password: 'test-password',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      try {
        await service.signIn(user);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('Invalid Password');
      }
    });

    it('should throw an error if there is a problem with the repository', async () => {
      try {
        await service.signIn({} as any);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('User does not exist');
      }
    });
  });
});
