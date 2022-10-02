import { loginUser, registerUser } from './userService';
import { AppDataSource } from '../utill/data-source';
import { User } from '../entity/User';
const bcrypt = require('bcrypt');
const userRepo = AppDataSource.getRepository(User);

describe('User Controll', () => {
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

    test('Login Successe', async () => {
      User.findOneBy = jest.fn().mockReturnValue(user);
      const mockHash = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const res = await loginUser(loginData);

      expect(res).toEqual(user);
      mockHash.mockRestore();
    });

    test('Login faield', async () => {
      User.findOneBy = jest.fn().mockResolvedValue(() => undefined);
      const res = await loginUser(loginData);
      expect(res).toEqual({ error: 'login sercive Error' });
    });
  });

  // describe('User Register', () => {
  //   const userRegisterDetails = {
  //     body: {
  //       name: 'test',
  //       email: 'test@t@t.com',
  //       password: 'test',
  //     },
  //   };
  //   const userTest = {
  //     name: 'test',
  //     email: 'test@t@t.com',
  //     password: 'test',
  //     role: 'User',
  //     id: 1,
  //   };
  //   const value = {
  //     name: 'test',
  //     password: 'test',
  //     email: 'test@t.com',
  //     role: 'User',
  //   };
  //   test('Register Sucess', async () => {
  //     User.create = jest.fn().mockRejectedValue(value);
  //     //User.create.save = jest.fn().mockResolvedValue();
  //     //const userSave = jest.spyOn(user, 'save').mockResolvedValue(userTest);
  //     const mockHash = jest.spyOn(bcrypt, 'hashSync').mockResolvedValue(true);
  //     const res = await registerUser(userRegisterDetails);
  //     expect(res).toEqual(userTest);
  //     mockHash.mockRestore();
  //   });
  // });
});
