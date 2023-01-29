import { Request, Response } from 'express';
import { signUp, signIn, signOut, refresh } from '../src/controllers/userController';
import * as UserService from '../src/services/userService';
import { User } from '../src/models/userModel';

describe('User Controller Test', () => {
  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Sign Up Test', () => {
    const newUser = {
      id: 1,
      email: 'thilinawaks@gmail.com',
      role: 'user',
    } as User;

    const req_signUp = {
      body: {
        email: 'thilinawakssssss@gmail.com',
        password: '12345678',
      },
    } as Request;

    const req_signUp_fail = {
      body: {},
    } as Request;

    const res_signUp = response();

    test('Sign Up Success', async () => {
      const spySignUp = jest.spyOn(UserService, 'createUser').mockResolvedValue(newUser as User);
      await signUp(req_signUp, res_signUp);
      expect(res_signUp.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.anything());
      expect(res_signUp.status).toHaveBeenCalledWith(200);
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
});
