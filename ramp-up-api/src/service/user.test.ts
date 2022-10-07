import { findUser, postUser } from './userService';
import { AppDataSource } from '../utilis/data-source';
import { Users } from '../entity/Users';
const bcrypt = require('bcrypt');
const userRepo = AppDataSource.getRepository(Users);

describe('User Controller Unit test case', () => {
  describe('User Login unit test', () => {
    const loginData = {
      query: {
        email: 'email@gmail.com',
        password: 'password',
      },
    };

    const user = {
      email: 'email@gmail.com',
      password: 'password',
      id: 1,
      role: 'User',
    };

    test('Login Success unit cases', async () => {
      Users.findOneBy = jest.fn().mockReturnValue(user);
      const mockHash = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const res = await findUser(loginData);

      expect(res.user).toEqual(user);
      mockHash.mockRestore();
    });

    test('Login fail unit test', async () => {
      Users.findOneBy = jest.fn().mockResolvedValue(() => undefined);
      const res = await findUser(loginData);
      expect(res).toEqual({ msg: 'login sercive Error' });
    });
  });

  describe('User Register', () => {
    const loginData = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',
    };
    const userTest = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',
      role: 'User',
      id: 1,
    } as never;
    const user = {
      name: 'name',
      password: 'password',
      email: 'email@gmail.com',
      role: 'User',
      save: jest.fn((x) => x),
    };
    test('Register Success unit test', async () => {
      Users.findOneBy = jest.fn().mockResolvedValue(null);
      jest.spyOn(Users, 'save').mockResolvedValue(userTest);
      const res = await postUser(loginData);
      console.log('response', res);
      expect(res).toEqual(userTest);
    });

    test('Register fails unit test', async () => {
      Users.findOneBy = jest.fn().mockRejectedValue(null);
      Users.create = jest.fn().mockResolvedValue(null);
      const userSave = jest.spyOn(user, 'save').mockResolvedValue(null);
      const mockHash = jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(false);
      const res = await postUser(loginData);
      expect(res).toEqual(undefined);
      mockHash.mockRestore();
      userSave.mockRestore();
    });
  });
});
