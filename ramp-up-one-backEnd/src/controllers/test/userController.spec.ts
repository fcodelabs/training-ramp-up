import { Request, Response } from 'express';
import { User } from '../../entities/userEntity';
import * as userServices from '../../services/userService';
import {
  saveUser,
  loginUser,
  refresh,
  logout,
  userDetail,
} from '../../controllers/userController';
import { UserModel } from '../../utils/interfaces';

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller', () => {
  describe('Register User', () => {
    const newUser: UserModel = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'New1234',
      userRoll: 'User',
    };
      const req = {
        body: {
          name: 'newUser',
          email: 'newUser@gmail.com',
          password: 'NewU1234',
        },
      } as Request;

      const res = mockResponse();

      test("Register User Success", async () => {
        const spyRegisterUser = jest 
          .spyOn(userServices, 'saveUserService')
          .mockResolvedValue(newUser);
        await saveUser(req, res);
       expect(res.json).toHaveBeenCalledWith(true);
        spyRegisterUser.mockRestore();
      })


       test('Register User Fail', async () => {
         const spyRegisterUser = jest
           .spyOn(userServices, 'saveUserService')
           .mockRejectedValue(null);
         await saveUser(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
         spyRegisterUser.mockRestore();
       });
  });

  describe('Login User', () => {
      const user: UserModel = {
        name: 'newUser',
        email: 'newUser@gmail.com',
        password: 'New1234',
        userRoll: 'User',
      };
      const req = {
        body: {
          email: 'newUser@gmail.com',
          password: 'NewU1234',
        },
      } as Request;

      const res = mockResponse();
        test('Login User Success', async () => {
          const spyLoginUser = jest
            .spyOn(userServices, 'getUser')
            .mockResolvedValue(user);
          await loginUser(req, res);
        expect(res.json).toHaveBeenCalledWith(true);
        spyLoginUser.mockRestore();
        });

        test('Login User Fail', async () => {
          const spyLoginUser = jest
            .spyOn(userServices, 'getUser')
            .mockRejectedValue(null);
          await loginUser(req, res);
          expect(res.status).toHaveBeenCalledWith(201);
          spyLoginUser.mockRestore();
        });
  });


  describe('Logout User', () => { const req = {} as Request;

  const res = mockResponse();

  test('Sign out success', async () => {
    await logout(req, res);

    expect(res.cookie).toHaveBeenCalledTimes(3);
    expect(res.status).toHaveBeenCalledWith(200);
    
  });});
});
