import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUserService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockUserService = module.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('should return the created user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@gmail.com',
        password: 'testpassword',
      };
      const user = { userRole: 'student', ...createUserDto };
      jest.spyOn(mockUserService, 'signUp').mockResolvedValue(user);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;
      await controller.signUp(createUserDto, res);

      expect(mockUserService.signUp).toHaveBeenCalledWith(createUserDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: user,
      });
    });

    it('Should throw an internal error', async () => {
      jest
        .spyOn(mockUserService, 'signUp')
        .mockRejectedValue(
          new HttpException(
            'Error in Signup',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.signUp({} as any, {} as Response);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Error in Signup');
        expect(error.status).toBe(500);
      }
    });

    it('should throw an error if user already exists', async () => {
      jest
        .spyOn(mockUserService, 'signUp')
        .mockRejectedValue(
          new HttpException('User already exists', HttpStatus.BAD_REQUEST),
        );
      try {
        await controller.signUp({} as any, {} as Response);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('User already exists');
        expect(error.status).toBe(400);
      }
    });

    it('should throw an error if email is not provided', async () => {
      jest
        .spyOn(mockUserService, 'signUp')
        .mockRejectedValue(
          new HttpException('Email is required', HttpStatus.BAD_REQUEST),
        );
      try {
        await controller.signUp({} as any, {} as Response);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Email is required');
        expect(error.status).toBe(400);
      }
    });
  });
});
