import { StudentsController } from '../students/students.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';

describe('StudentsController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            generateTokens: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('login', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const req = {
      user: {
        data: {
          email: 'test@gmail.com',
          firstName: 'test firstname',
          lastName: 'test lastname',
          admin: false,
        },
        authorized: true,
      },
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const tokens = { accessToken: 'token1', refreshToken: 'token2' };
    it('Should call res.cookie with access token and refresh token and res.json with user data', async () => {
      jest.spyOn(authService, 'generateTokens').mockReturnValue(tokens);
      await controller.login(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.cookie).toHaveBeenCalledWith(
        'accessToken',
        tokens.accessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        },
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'refreshToken',
        tokens.refreshToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        },
      );
      expect(res.json).toHaveBeenCalledWith(req.user);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('Should return error for error in login', async () => {
      const error = new Error('Error in login');
      jest.spyOn(authService, 'generateTokens').mockImplementation(() => {
        throw error;
      });
      try {
        await controller.login(req, res);
      } catch (err) {
        expect(err).toEqual(error);
      }
      expect(res.cookie).toHaveBeenCalledTimes(0);
      expect(res.json).toHaveBeenCalledTimes(0);
    });
  });

  describe('signup', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const res = {
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const testUserDto = {
      email: 'test@gmail.com',
      firstName: 'test firstname',
      lastName: 'test lastname',
      password: 'Abcd@1234',
      admin: false,
    };
    const expectedCreateResponse = {
      email: 'test@gmail.com',
      firstName: 'test firstname',
      lastName: 'test lastname',
      admin: false,
    };
    const tokens = { accessToken: 'token1', refreshToken: 'token2' };
    it('Should call res.cookie with cookies and res.json with user dara', async () => {
      jest
        .spyOn(userService, 'create')
        .mockResolvedValueOnce(expectedCreateResponse);
      jest.spyOn(authService, 'generateTokens').mockReturnValue(tokens);
      await controller.signUp(testUserDto, res);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith(expectedCreateResponse);
      expect(res.cookie).toHaveBeenCalledWith(
        'accessToken',
        tokens.accessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        },
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'refreshToken',
        tokens.refreshToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        },
      );
    });
    it('Should return error for error in create', async () => {
      const error = new Error('Error in create');
      jest.spyOn(userService, 'create').mockRejectedValue(error);
      jest.spyOn(authService, 'generateTokens').mockReturnValue(tokens);
      try {
        await controller.signUp(testUserDto, res);
      } catch (err) {
        expect(err).toEqual(error);
      }
      expect(res.json).toHaveBeenCalledTimes(0);
      expect(res.cookie).toHaveBeenCalledTimes(0);
    });
  });

  describe('signout', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const res = {
      clearCookie: jest.fn().mockReturnThis(),
    } as unknown as Response;

    it('Should call res.clearCookies with accessToken and refreshToken', () => {
      controller.signOut(res);
      expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
      expect(res.clearCookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateToken', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const req = {
      user: {
        email: 'test@gmail.com',
        admin: false,
      },
    } as unknown as Request;

    const res = {
      cookie: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const tokens = {
      accessToken: 'token1',
      refreshToken: 'token2',
    };
    it('Should call cookie with new accessToken', () => {
      jest.spyOn(authService, 'generateTokens').mockReturnValue(tokens);
      controller.updateToken(req, res);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith(
        'accessToken',
        tokens.accessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        },
      );
    });
    it('Should call cookie with new accessToken', async () => {
      const error = new Error('Error in generateTokens');
      jest.spyOn(authService, 'generateTokens').mockImplementation(() => {
        throw error;
      });
      try {
        await controller.updateToken(req, res);
      } catch (err) {
        expect(err).toEqual(error);
      }
      expect(res.cookie).toHaveBeenCalledTimes(0);
    });
  });
});
