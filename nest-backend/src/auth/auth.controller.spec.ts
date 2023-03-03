import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token and set refresh token cookie in response', async () => {
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'password',
      };
      const user = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        email: 'test@test.com',
        userRole: 'user',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(user);

      const response = {
        cookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await authController.login(loginDto, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        accessToken: 'access_token',
        email: 'test@test.com',
        userRole: 'user',
      });
    });
  });

  describe('refresh', () => {
    it('should return a new access token', async () => {
      const req = {
        cookies: {
          jwt: 'refresh_token',
        },
      };
      const access_token = 'new_access_token';
      jest.spyOn(authService, 'refreshToken').mockResolvedValue(access_token);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await authController.refresh(req, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        accessToken: 'new_access_token',
      });
    });

    it('should return 403 if no refresh token cookie is present', async () => {
      const req = {
        cookies: undefined,
      };

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as any;

      await authController.refresh(req, response);
      expect(response.status).toHaveBeenCalledWith(403);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Unauthorized',
      });
    });
  });

  describe('logout', () => {
    it('should clear the jwt cookie and return a success message', async () => {
      const res: Partial<Response> = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await authController.logout(res as Response);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'You have been successfully logged out',
      });
    });
  });
});
