import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>('UserRepository');
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('signUp', () => {
    it('should create a new user and return it', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'password';
      user.role = 'student';

      const existingUser = null;
      userRepository.findOneBy = jest.fn().mockResolvedValue(existingUser);

      const expectedHashedPassword = await bcrypt.hash(user.password, 10);
      const expectedSavedUser = Object.assign({}, user);
      expectedSavedUser.password = expectedHashedPassword;
      userRepository.save = jest.fn().mockResolvedValue(expectedSavedUser);

      const result = await authService.signUp(user);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: user.email,
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectedSavedUser);
    });

    it('should throw an error if an error occurs during the signup process', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'password';

      userRepository.findOneBy = jest
        .fn()
        .mockRejectedValue(new HttpException('Database Error', 500));

      await expect(authService.signUp(user)).rejects.toThrow(
        new HttpException('Database Error', 500),
      );
    });

    it('should return null if the user already exists', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'password';

      const existingUser = new User();
      existingUser.email = user.email;
      existingUser.password = 'hashedPassword';
      userRepository.findOneBy = jest.fn().mockResolvedValue(existingUser);

      const result = await authService.signUp(user);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: user.email,
      });
      expect(result).toBeNull();
    });
  });

  describe('validateUser', () => {
    it('should return the user if the email and password are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';

      const user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);

      const result = await authService.validateUser(email, password);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toEqual(expect.objectContaining({ email }));
      expect(result.password).toBeUndefined();
    });
  });
  describe('login', () => {
    it('should return the user if the email and password are valid', async () => {
      const user = {
        id: 1,
        email: 'abc@gmail.com',
        role: 'student',
      };
      const tokens = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };
      jest.spyOn(authService, 'getTokens').mockResolvedValue(tokens);
      const result = await authService.login(user);

      expect(result).toStrictEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        role: 'student',
      });
    });
  });
  // describe('getTokens', () => {
  //   it('should return access and refresh tokens', async () => {
  //     const accessToken = 'access_token';
  //     const refreshToken = 'refresh_token';
  //     jest
  //       .spyOn(authService.jwtService, 'signAsync')
  //       .mockImplementation(async () => accessToken);
  //     jest
  //       .spyOn(authService.jwtService, 'signAsync')
  //       .mockImplementation(async () => refreshToken);
  //     jest
  //       .spyOn(authService.configService, 'get')
  //       .mockImplementation(() => 'secret');

  //     const result = await authService.getTokens('123', 'test@example.com');

  //     expect(result).toEqual({
  //       accessToken,
  //       refreshToken,
  //     });
  //   });
  // });

  describe('refreshTokens', () => {
    it('should return a new access token', async () => {
      // Arrange
      const refreshToken = 'valid.refresh.token';
      const decodedJwtAccessToken = {
        id: 'user_id',
        email: 'user@example.com',
      };
      const accessToken = 'new.access.token';
      jwtService.decode = jest.fn().mockReturnValue(decodedJwtAccessToken);
      jwtService.signAsync = jest.fn().mockResolvedValue(accessToken);
      configService.get = jest.fn().mockReturnValue('ACCESS_TOKEN_SECRET');

      // Act
      const result = await authService.refreshTokens(refreshToken);

      // Assert
      expect(result).toBe(accessToken);
      expect(jwtService.decode).toHaveBeenCalledWith(refreshToken);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        decodedJwtAccessToken,
        expect.objectContaining({
          secret: 'ACCESS_TOKEN_SECRET',
          expiresIn: '15s',
        }),
      );
      expect(configService.get).toHaveBeenCalledWith('ACCESS_TOKEN_SECRET');
    });
  });
});
