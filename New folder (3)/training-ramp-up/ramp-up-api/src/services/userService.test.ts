import { loginUser, registerUser } from './userService';

import { User } from '../entity/User';
const bcrypt = require('bcrypt');

describe('User Controller', () => {
  describe('User Login', () => {
    const loginData = {
      query: {
        email: 'test@t.com',
        password: 'testPassword',
      },
    };

    const user = {
      email: 'test@t.com',
      password: 'testPassword',
      id: 1,
      role: 'User',
    };

    test('Login Success', async () => {
      User.findOneBy = jest.fn().mockReturnValue(user);
      const mockHash = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const res = await loginUser(loginData);
      expect(res.user).toEqual(user);
      mockHash.mockRestore();
    });

    test('Login fail', async () => {
      User.findOneBy = jest.fn().mockResolvedValue(() => undefined);
      const res = await loginUser(loginData);
      expect(res).toEqual({ error: 'login service Error' });
    });
  });

  describe('User Register', () => {
    const loginData = {
      name: 'test',
      email: 'test@t.com',
      password: 'testPassword',
    };
    const userTest = {
      name: 'test',
      email: 'test@t@t.com',
      password: 'test',
      role: 'User',
      id: 1,
    } as never;

    const user = {
      name: 'test',
      password: 'test',
      email: 'test@t.com',
      role: 'User',
      save: jest.fn((x) => x),
    };
    test('Register Success', async () => {
      User.findOneBy = jest.fn().mockResolvedValue(null);
      jest.spyOn(User, 'save').mockResolvedValue(userTest);
      jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(true);
      const res = await registerUser(loginData);
      expect(res).toEqual(userTest);
    });

    test('Register fails', async () => {
      User.findOneBy = jest.fn().mockRejectedValue(null);
      User.create = jest.fn().mockResolvedValue(null);
      const userSave = jest.spyOn(user, 'save').mockResolvedValue(null);
      const mockHash = jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(false);
      const res = await registerUser(loginData);
      expect(res).toEqual(undefined);
      mockHash.mockRestore();
      userSave.mockRestore();
    });
  });
});
