import { Request, Response } from 'express';
import { signUp, signIn, refresh, signOut } from '../src/controllers/userController';
import * as UserService from '../src/services/userService';
import { User } from '../src/models/userModel';

describe('User Controller Test', () => {
  const mockResponse = () => {
    const res = {} as Response;
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Sign Up Test', () => {
    const newUser = {
      email: 'thilinawaks@gmail.com',
      role: 'user',
      id: 1,
    } as User;

    const req_signUp = {
      body: {
        email: 'thilinawaks@gmail.com',
        password: '12345678',
      },
    } as Request;

    const req_signUp_fail = {
      body: {},
    } as Request;

    const res_signUp = mockResponse() as Response;

    test('Sign Up Success', async () => {
      const spySignUp = jest.spyOn(UserService, 'createUser').mockResolvedValue(newUser as User);

      await signUp(req_signUp, res_signUp);
      expect(res_signUp.status).toHaveBeenCalledWith(200);
      expect(res_signUp.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.anything());
      expect(res_signUp.json).toHaveBeenCalledWith({ message: 'User created successfully', user: newUser });
      spySignUp.mockRestore();
    });
    test('Sign Up Fail', async () => {
      const spySignUp = jest.spyOn(UserService, 'createUser').mockResolvedValue({} as User);
      await signUp(req_signUp_fail, res_signUp);
      expect(res_signUp.status).toHaveBeenCalledWith(400);
      expect(res_signUp.json).toHaveBeenCalledWith({ err: 'Email and password are required' });
      spySignUp.mockRestore();
    });
  });

  describe('Sign In Test', () => {
    const newUser = {
      email: 'user@gmail.com',
      role: 'user',
      id: 1,
    } as User;
    const req_signIn = {
      body: {
        email: 'user@gmail.com',
        password: '12345678',
      },
    } as Request;
    const req_signIn_fail = {
      body: {},
    } as Request;

    const res_signIn = mockResponse() as Response;

    test('Sign In Success', async () => {
      const spySignIn = jest.spyOn(UserService, 'loginUser').mockResolvedValue(newUser as User);

      await signIn(req_signIn, res_signIn);
      expect(res_signIn.status).toHaveBeenCalledWith(200);
      expect(res_signIn.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.anything());
      expect(res_signIn.json).toHaveBeenCalledWith({ message: 'User logged in successfully', user: newUser });
      spySignIn.mockRestore();
    });
    test('Sign In Fail', async () => {
      const spySignIn = jest.spyOn(UserService, 'loginUser').mockResolvedValue({} as User);
      await signIn(req_signIn_fail, res_signIn);
      expect(res_signIn.status).toHaveBeenCalledWith(400);
      expect(res_signIn.json).toHaveBeenCalledWith({ err: 'Email and password are required' });
      spySignIn.mockRestore();
    });
  });

  describe('Refresh Test', () => {
    //If you fail this test, you need to change the refresh token in the code with a new one
    const req_refresh = {
      cookies: {
        refresh:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzQ5OTYxMDUsImV4cCI6MTY4MzYzNjEwNX0.ciyOXNZ989VJvgttcdGupRtMnO6Co6G9xXFTcrkuVDU',
      },
    } as Request;

    const req_refresh_fail = {
      cookies: {},
    } as Request;

    const res_refresh = mockResponse() as Response;

    test('Refresh Success', async () => {
      await refresh(req_refresh, res_refresh);
      expect(res_refresh.status).toHaveBeenCalledWith(200);
      expect(res_refresh.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.anything());
      expect(res_refresh.json).toHaveBeenCalledWith({ message: 'User refreshed successfully' });
    });
    test('Refresh Fail', async () => {
      await refresh(req_refresh_fail, res_refresh);
      expect(res_refresh.status).toHaveBeenCalledWith(400);
      expect(res_refresh.json).toHaveBeenCalledWith({ err: 'No refresh token found' });
    });
  });

  describe('Sign Out Test', () => {
    const req_signOut = {} as Request;
    const res_signOut = mockResponse() as Response;

    test('Sign Out Success', async () => {
      await signOut(req_signOut, res_signOut);
      expect(res_signOut.status).toHaveBeenCalledWith(200);
      expect(res_signOut.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.anything());
      expect(res_signOut.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
    });
  });
});
