/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../src/models/userModel';
import { appDataSource } from '../src/configs/dataSourceConfig';
import * as UserService from '../src/services/userService';

describe('User Service Test', () => {
  const user = {
    email: 'user@egmail.com',
    password: '12345678',
  } as User;

  const userCreated = {
    id: 1,
    email: 'user@egmail.com',
    password: '$2a$10$ofSzq8bhVtTklfgTs4ZcB.hshygjIvucvWdiX7U2FO14DGh7WZlhm',
    role: 'user',
  } as User;

  const user2 = {
    email: 'user2@gmail.com',
  } as User;

  describe('Create User', () => {
    it('should create a user', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource.manager, 'save');
      spyAppDataSource.mockResolvedValue(userCreated);
      const result = await UserService.createUser(user);
      expect(result).toEqual(userCreated);
      expect(spyAppDataSource).toHaveBeenCalledTimes(1);
      spyAppDataSource.mockRestore();
    });

    it('should throw an error if user already exists', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource.manager, 'save');
      spyAppDataSource.mockRejectedValue(new Error('Already exists for this email'));
      try {
        await UserService.createUser(user);
      } catch (error) {
        expect(error).toBe('Already exists for this email');
      }
      spyAppDataSource.mockRestore();
    });

    it('should throw an error if user is not valid', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource.manager, 'save');
      spyAppDataSource.mockRejectedValue(new Error());
      try {
        await UserService.createUser(user2);
      } catch (error) {
        expect(error).toBe('Error: Illegal arguments: undefined, number');
      }
      spyAppDataSource.mockRestore();
    });
  });

  describe('Login User', () => {
    it('should login a user', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource, 'getRepository');
      spyAppDataSource.mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue(userCreated),
      } as any);
      const result = await UserService.loginUser(user.email, user.password);
      expect(result).toEqual(userCreated);
      expect(spyAppDataSource).toHaveBeenCalledTimes(1);
      spyAppDataSource.mockRestore();
    });

    it('should throw an error if user not found', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource, 'getRepository');
      spyAppDataSource.mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue(null),
      } as any);
      try {
        await UserService.loginUser(user.email, user.password);
      } catch (error) {
        expect(error).toBe('User not found');
      }
      spyAppDataSource.mockRestore();
    });

    it('should throw an error if password is incorrect', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource, 'getRepository');
      spyAppDataSource.mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue(userCreated),
      } as any);
      try {
        await UserService.loginUser(user.email, '123456789');
      } catch (error) {
        expect(error).toBe('Incorrect password');
      }
      spyAppDataSource.mockRestore();
    });

    it('should throw an error if user is not valid', async () => {
      const spyAppDataSource = jest.spyOn(appDataSource, 'getRepository');
      spyAppDataSource.mockReturnValue({
        findOneBy: jest.fn().mockResolvedValue(userCreated),
      } as any);
      try {
        await UserService.loginUser(user2.email, user.password);
      } catch (error) {
        expect(error).toBe('User not found');
      }
      spyAppDataSource.mockRestore();
    });
  });
});
