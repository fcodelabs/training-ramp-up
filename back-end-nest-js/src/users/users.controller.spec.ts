/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserInterface } from './interfaces/users.interface'
import User from './entities/users.entity';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

describe('User Controller Test', () => {  
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          getUserService: jest.fn((x) => x),
          addUserService: jest.fn((x) => x)
        },
      },{
        provide: AuthService,
        useValue: {
          getTokens: jest.fn(),
          getAccessToken: jest.fn(),
          verifyRefresh: jest.fn(),
        },
      },],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
    authService = module.get(AuthService);
  });

  const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('Add User controller test', () => {
    const newUser = {
      id: 1,
      userName: 'newUser',
      email: 'newuser@gmail.com',
      password: 'NewUserPw123.',
      role: 'Admin'
    } as User

    const req1 = {
      body: {
        userName: 'NewUser',
        email: 'newuser@gmail.com',
        password: 'NewUserPw123.',
        confirmPassword: 'NewUserPw123.',
        role: 'Admin'
      }
    } as Request

    const req2 = {
      body: {
        userName: 'newUser',
        email: 'newUsergmail.com',
        password: 'NewUserPw123.',
        confirmPassword: 'NewUserPw3.',
        role: 'Admin'

      }
    } as Request

    const res = response()

    it('Add User success', async () => {
      const spyAddUser = jest
        .spyOn(usersService, 'addUserService')
        .mockResolvedValue(newUser)
      await usersController.signupUser(req1.body, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith(newUser)
      spyAddUser.mockRestore()
    })
    it('Add User fail', async () => {
      const spyAddUser = jest
        .spyOn(usersService, 'addUserService')
        .mockResolvedValue(false)
      await usersController.signupUser(req1.body, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Email was already used')
      spyAddUser.mockRestore()
    })
    it('Add User fail with Invalid Data', async () => {
      await usersController.signupUser(req2.body, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not add student. Enter Valid Data')
    })
  })

  describe('Signout User controller test', () => {
    const req = {} as Request

    const res = response()

    it('Signout User success', async () => {
      await usersController.signoutUser(res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith('User Logged out')
      expect(res.cookie).toHaveBeenCalledTimes(3)
    })
  })

  describe('Get New Access Token', () => {
    const accessToken = 'accessToken'

    const req1 = {
      cookies: {
        user: 'NewUser',
        refreshToken: 'newuserrefreshtoken'
      }
    } as Request

    const req2 = {
      cookies: {
        user: null,
        refreshToken: null
      }
    } as Request

    const res = response()

    it('Get Token success', async () => {
      const spyverifytoken = jest
        .spyOn(authService, 'verifyRefresh')
        .mockResolvedValue(true)
      const spygettoken = jest
        .spyOn(authService, 'getAccessToken')
        .mockResolvedValue(accessToken)
      await usersController.refreshUser(req1, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Invalid refresh Token')
      expect(res.cookie).toHaveBeenCalledTimes(0)
      spyverifytoken.mockRestore()
      spygettoken.mockRestore()
    })
    it('Get Token fail with no token', async () => {
      await usersController.refreshUser(req2, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Unauthorized Access')
    })
    it('Get Token with wrong token', async () => {
      const spyverifytoken = jest
        .spyOn(authService, 'verifyRefresh')
        .mockResolvedValue(false)
      await usersController.refreshUser(req1, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Invalid refresh Token')
      spyverifytoken.mockRestore()
    })
  })

  describe('Get User controller test', () => {
    const userResult = {
      id: 1,
      userName: 'newUserName',
      email: 'newuser@gmail.com',
      password: 'NewUserPw123',
      role: 'Guest'
    } as UserInterface

    const req = {
      body: {
        email: 'newuser@gmail.com',
        password: 'NewUserPw123.'
      }
    } as Request

    const res = response()

    const tokens = { tokens: { accessToken: 'accessToken', refreshToken: 'refreshToken' }}

    it('Get User success', async () => {
      const spyGetUser = jest
        .spyOn(usersService, 'getUserService')
        .mockResolvedValue(userResult)
      const spyGetTokens = jest
        .spyOn(authService, 'getTokens')
        .mockResolvedValue(tokens.tokens)
      await usersController.signinUser(req.body, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.cookie).toHaveBeenCalledTimes(3)
      expect(res.send).toHaveBeenCalledWith(userResult)
      spyGetUser.mockRestore()
      spyGetTokens.mockRestore()
    })
    it('Get User fail', async () => {
      const spyGetUser = jest
        .spyOn(usersService, 'getUserService')
        .mockResolvedValue(null)
      await usersController.signinUser(req.body, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Email or Password Invalid')
      spyGetUser.mockRestore()
    })
  })
});