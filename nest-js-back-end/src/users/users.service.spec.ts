import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Register User', () => {
    const newUser: CreateUserDto = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'New1234',
      userRoll: 'User',
      id: 0,
    };
    it('Register User Success', async () => {
      userRepository.save = jest.fn().mockResolvedValue(newUser);
      const res: any = await service.create(newUser);
      expect(res).toEqual(newUser);
    });

    it('Register User Fail', async () => {
      userRepository.save = jest.fn().mockRejectedValue(null);
      const res = await service.create(newUser);
      expect(res).toThrowError;
    });
  });

  describe('Login User', () => {
    // const loginData: LoginUserDto = {
    //   email: 'user@gmail.com',
    //   password: 'User1234',
    // };
    const user: CreateUserDto = {
      id: 1,
      name: 'newUser',
      email: 'user@gmail.com',
      password: 'User1234',
      userRoll: 'User',
    };
    it('Login User Success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => () => ({ verified: 'true' }));
      const res: any = await service.findOne(user);
      expect(res).toEqual(user);
    });

    it('Login User Fail,invalid Email', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);
      const res = await service.findOne(user);
      expect(res).toEqual(false);
    });

    it('Login User Fail,Incorrect password', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => () => ({ verified: false }));
      const res = await service.findOne(user);
      expect(res).toEqual(user);
    });
  });
});
