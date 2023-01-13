/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userServices from '../src/services/userService';
import { Request, Response } from 'express';
import { signupUser, loginUser, refreshToken, logoutUser, userDetails } from '../src/controllers/userController';
import jwt = require('jsonwebtoken');

const mockResponse = () => {
  const res = {} as Response;
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller', () => {
  describe('Request User Signup', () => {
    const user = {
      id: 1,
      email: 'nalim123@gmail.com',
      password: '2wsxzaq1',
      role: 'admin',
    } as any;

    const req = {
      body: {
        email: 'nalim123@gmail.com',
        password: '2wsxzaq1',
        role: 'admin',
      },
    } as Request;

    const res = mockResponse();

    test('Signup success', async () => {
      const spyAddUser = jest.spyOn(userServices, 'createUserService').mockResolvedValue(user);

      await signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User created successfully',
      });
      spyAddUser.mockRestore();
    });

    test('Signup Failed', async () => {
      const spyAddUser = jest.spyOn(userServices, 'createUserService').mockRejectedValue(null);

      await signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Invalid Signup');
      spyAddUser.mockRestore();
    });
  });

  describe('Request User Login', () => {
    it('should return 200 and success message on successful login', async () => {
      const req: any = {
        body: { email: 'nalim123@gmail.com', password: '2wsxzaq1' },
      };

      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Logged in successfully',
      });
    });

    it('should return 400 and error message on invalid login credentials', async () => {
      const req: any = {
        body: { email: 'nalim123@gmail.com', password: '2wsxzaq1' },
      };
      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'err',
      });
    });
  });

  describe('Request Refresh Token', () => {
    it('should return 200 and success message', async () => {
      const req: any = {
        cookies: {
          refreshToken: 'valid-refresh-token',
        },
      };
      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      process.env.REFRESH_TOKEN_SECRET = 'secret';
      process.env.JWT_SECRET = 'secret';

      await refreshToken(req, res);

      expect(res.cookie).toHaveBeenCalledWith('accessToken', expect.any(String), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        accessToken: expect.any(String),
        message: 'Token refreshed',
      });
    });

    it('should return 400 and error message', async () => {
      const req: any = {
        cookies: {
          refreshToken: 'invalid-refresh-token',
        },
      };
      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jwt.verify = jest.fn(() => {
        throw new Error('invalid token');
      });

      await refreshToken(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'error',
      });
    });
  });

  describe('Request User Logout', () => {
    it('should return 200 with success', async () => {
      const req: any = {};
      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await logoutUser(req, res);

      expect(res.cookie).toHaveBeenCalledWith('accessToken', '', {
        maxAge: -1,
        httpOnly: true,
      });
      expect(res.cookie).toHaveBeenCalledWith('refreshToken', '', {
        maxAge: -1,
        httpOnly: true,
      });
      expect(res.cookie).toHaveBeenCalledWith('user', '', {
        maxAge: -1,
        httpOnly: false,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logged out sucessfully',
      });
    });

    // it('should return 400 and error messsage', async () => {
    //   const req: any = {};
    //   const res: any = {
    //     cookie: jest.fn(() => {
    //       throw new Error('error clearing cookies');
    //     }),
    //     status: jest.fn().mockReturnThis(),
    //     json: jest.fn(),
    //   };
    //   const err = 'some error';

    //   await logoutUser(req, res);
    //   res.status(400).send(err);
    //   expect(res.status).toHaveBeenCalledWith(400);
    //   expect(res.send).toHaveBeenCalledWith('some error');
    // });
  });

  describe('Request User Details', () => {
    test('User Details success', async () => {
      const req: any = {
        cookies: {
          accessToken: 'valid-access-token',
        },
      };
      const res: any = {
        cookie: jest.fn(),
        sendStatus: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      process.env.JWT_SECRET = 'secret';
      process.env.USER_KEY = 'user-key';

      jwt.verify = jest.fn(() => {
        return {
          id: 'user-id',
          email: 'user@email.com',
        };
      });

      jwt.sign = jest.fn((data: any, key: any) => {
        return JSON.stringify({
          data,
          key,
        });
      });

      await userDetails(req, res);

      expect(jwt.verify).toHaveBeenCalledWith('valid-access-token', 'secret');
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: 'user-id',
          email: 'user@email.com',
        },
        'user-key'
      );
      expect(res.cookie).toHaveBeenCalledWith('user', expect.any(String), {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
      });
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    test('User details Error', async () => {
      const req: any = {
        cookies: {
          accessToken: 'invalid-access-token',
        },
      };
      const res: any = {
        cookie: jest.fn(),
        sendStatus: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      jwt.verify = jest.fn(() => {
        throw new Error('Invalid token');
      });

      await userDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Error : Invalid token');
    });
  });
});
