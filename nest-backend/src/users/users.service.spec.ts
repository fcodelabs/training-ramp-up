import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

const bcrypt = require('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: class MockRepository extends Repository<User> {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('signUp', () => {
    it('should create a new user with a hashed password', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const hash =
        '$2b$10$wv6jB/E79NV0Mfv2JW0qxOtuCMN1KjtpSl6eNXU6C.KU6vq3qoEyy'; // bcrypt hash for 'password'
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(hash);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValueOnce(createUserDto as User);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(createUserDto as User);

      const user = await service.signUp(createUserDto);

      expect(user).toEqual(createUserDto);
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an HttpException if the user already exists', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(createUserDto as User);

      await expect(service.signUp(createUserDto)).rejects.toThrow(
        HttpException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should rethrow any caught errors as an HttpException', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const error = new Error('Database connection error');
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(error);

      await expect(service.signUp(createUserDto)).rejects.toThrow(
        HttpException,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });
});
