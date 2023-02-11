import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('ControllerController', () => {
  let controller: UserController;

  const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
  } as unknown as Response | any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(() => {
              return {
                email: 'user@gmail.com',
                role: 'user',
              };
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should return user', async () => {
      const userDto = {
        email: 'user@gmail.com',
        password: '12345678',
      };
      const user = {
        email: 'user@gmail.com',
        password: 'hash',
      };
      const userService = controller['userService'];
      jest.spyOn(userService, 'signUp').mockResolvedValue(user);
      await controller.signUp(userDto, responseMock as any);
      expect(responseMock.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.any(Array),
      );
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user,
      });
    });

    it('should throw error', async () => {
      const userService = controller['userService'];
      jest
        .spyOn(userService, 'signUp')
        .mockRejectedValue(
          new HttpException(
            'Error creating user',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.signUp({} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe('Error creating user');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('signIn', () => {
    it('should return user', async () => {
      const userDto = {
        email: 'user@gmail.com',
        password: '12345678',
      };
      const user = {
        email: 'user@gmail.com',
        password: 'hash',
      };
      const userService = controller['userService'];
      jest.spyOn(userService, 'signIn').mockResolvedValue(user);
      await controller.signIn(userDto, responseMock as any);
      expect(responseMock.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.any(Array),
      );
      expect(responseMock.status).toHaveBeenCalledWith(201);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user,
      });
    });

    it('should throw error', async () => {
      const userService = controller['userService'];
      jest
        .spyOn(userService, 'signIn')
        .mockRejectedValue(
          new HttpException(
            'Error logging in user',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      try {
        await controller.signIn({} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe('Error logging in user');
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('signOut', () => {
    it('should return user', async () => {
      await controller.logout(responseMock as any);
      expect(responseMock.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.any(Array),
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'User logged out successfully',
      });
    });

    it('should throw error', async () => {
      try {
        await controller.signIn({} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe(
          "Cannot read properties of undefined (reading 'email')",
        );
      }
    });
  });

  describe('refresh', () => {
    it('should return user', async () => {
      const requestMock = {
        cookies: {
          refresh: 'refreshToken',
        },
      } as Request;
      await controller.refresh(responseMock, requestMock as any);
      expect(responseMock.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.any(Array),
      );
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'User refreshed successfully',
      });
    });

    it('should throw error when refresh token not found', async () => {
      const requestMock = {
        cookies: {},
      } as Request;
      try {
        await controller.refresh(responseMock, requestMock as any);
      } catch (error) {
        expect(error.message).toBe('Refresh token not found');
        expect(error.status).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('should throw error', async () => {
      try {
        await controller.signIn({} as any, responseMock);
      } catch (error) {
        expect(error.message).toBe(
          "Cannot read properties of undefined (reading 'email')",
        );
      }
    });
  });
});
