import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { HttpException, HttpStatus, Request } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            login: jest.fn(),
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should return 201 status code and "sign up success" message', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      const newUser: User = {
        email: 'test@example.com',
        password: 'testpassword',
        role: 'student',
      } as User;
      jest.spyOn(authService, 'signUp').mockResolvedValue(newUser);
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.signup(signUpDto, response);

      expect(authService.signUp).toBeCalledWith(newUser);
      expect(response.status).toBeCalledWith(201);
      expect(response.json).toBeCalledWith('sign up success');
    });

    it('should return 200 status code and "Email already exists" message', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'testpassword',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(null);
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.signup(signUpDto, response);

      expect(authService.signUp).toBeCalledWith(expect.any(User));
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith('Email already exists');
    });

    it('should throw an error', async () => {
      jest
        .spyOn(authService, 'signUp')
        .mockRejectedValue(
          new HttpException(
            'Error in Signup',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.signup({} as any, {} as Response);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error in Signup');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('login', () => {
    it('should return 201 status code and a token object', async () => {
      const obj = {
        access_token: 'access',
        refresh_token: 'refresh',
        role: 'student',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(obj);
      const request = {} as Request;
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;

      await controller.login(request, response);

      // expect(authService.login).toBeCalledWith(user);
      expect(response.cookie).toBeCalledWith('jwt', 'refresh', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      expect(response.status).toBeCalledWith(201);
      expect(response.json).toBeCalledWith({
        access_token: 'access',
        role: 'student',
      });
    });

    it('should throw an error', async () => {
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(
          new HttpException('Error log in', HttpStatus.INTERNAL_SERVER_ERROR),
        );
      try {
        await controller.login({} as Request, {} as Response);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error log in');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('refreshTokens', () => {
    it('should return new access tokens when called', async () => {
      jest
        .spyOn(authService, 'refreshTokens')
        .mockResolvedValue('access_token');
      const request = {
        cookies: {
          jwt: 'refresh_token',
        },
      } as unknown as Request;

      const result = await controller.refresh(request);
      expect(authService.refreshTokens).toBeCalledWith('refresh_token');
      expect(result).toBe('access_token');
    });
    it('should throw an error', async () => {
      jest
        .spyOn(authService, 'refreshTokens')
        .mockRejectedValue(
          new TypeError("Cannot read properties of undefined (reading 'jwt')"),
        );
      try {
        await controller.refresh({} as Request);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe(
          "Cannot read properties of undefined (reading 'jwt')",
        );
      }
    });
  });
  describe('logout', () => {
    it('should clear cookies and gives a logout success message', async () => {
      const response = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.logout(response);
      expect(response.clearCookie).toHaveBeenCalledWith('jwt');
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith('logout success');
    });
    it('should throw an error', async () => {
      const response = {
        clearCookie: jest.fn().mockImplementation(() => {
          throw new Error('Failed to clear cookie');
        }),
        status: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;
      try {
        await controller.logout(response);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Failed to clear cookie');
      }
    });
  });
});
