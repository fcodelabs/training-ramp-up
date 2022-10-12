import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../dto/user.dto';
import { User } from '../entity/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create User', () => {
    it('it should create success', async () => {
      const user_02 = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      const user_01: Users = {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'password',
        role: 'user',
      } as never;
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user_02);
      const res = await service.createUser(user_01);
      expect(res).toEqual(user_02);
    });
    // it('it must error', async () => {
    //   const student_01: Users = {
    //     id: 1,
    //     name: 'test',
    //     gender: 'Male',
    //     address: 'testAddress',
    //     mobile_number: '123456789',
    //     date: new Date('2001-04-05 00:00:00'),
    //     age: 21,
    //   } as never;
    //   jest.spyOn(userRepository, 'save').mockResolvedValueOnce(null);
    //   const res = await service.createUser(student_01);
    //   expect(res).toEqual({ error: 'catch error' });
    // });
  });
  // describe('log User', () => {
  // it('it should log success', async () => {
  //   const user_02 = {
  //     id: 1,
  //     name: 'test',
  //     email: 'test@gmail.com',
  //     password: 'password',
  //     role: 'user',
  //   } as never;
  //   const user_01: Users = {
  //     id: 1,
  //     name: 'test',
  //     email: 'test@gmail.com',
  //     password: 'password',
  //     role: 'user',
  //   } as never;
  //   jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user_02);
  //   const res = await service.createUser(user_01);
  //   expect(res).toEqual(user_02);
  // });
  // it('it must error', async () => {
  //   const user1: Users = {
  //     email: 'test@gmail.com',
  //     password: 'password',
  //   } as never;
  //   jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);
  //   const res = await service.logUser(user1);
  //   expect(res).toEqual({ error: 'catch error' });
  // });
  // });
});
