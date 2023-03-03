import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
const bcrypt = require('bcrypt');

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
          provide: getRepositoryToken(User),
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
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('validateUser', () => {
    it('should return a user if email and password are correct', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password', 10);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(result).toEqual({ email: 'test@example.com' });
    });

    it('should return null if email is incorrect', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await authService.validateUser(
        'wrong@example.com',
        'password',
      );

      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password', 10);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await authService.validateUser(
        'test@example.com',
        'wrong',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a token if email and password are correct', async () => {
      const user = new User();
      user.email = 'test@gmail.com';
      user.userRole = 'student';
      user.password = await bcrypt.hash('password', 10);
      const foundUser = { email: user.email, userRole: 'student' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(foundUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      const result = await authService.login(user);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('userRole');
    });

    it('should call validateUser with the correct parameters', async () => {
      const user = { email: 'test@test.com', password: 'password' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue({});

      await authService.login(user);

      expect(authService.validateUser).toHaveBeenCalledWith(
        user.email,
        user.password,
      );
    });

    it('should call signAsync with the correct parameters for access_token and refresh_token', async () => {
      const user = { email: 'test@test.com', password: 'password' };

      const foundUser = { email: user.email, userRole: 'student' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(foundUser);
      const expiresIn = { expiresIn: expect.any(String) };
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      await authService.login(user);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        foundUser,
        expect.objectContaining(expiresIn),
      );
    });

    it('should call get with the correct parameter for access_token and refresh_token', async () => {
      const user = { email: 'test@test.com', password: 'password' };
      const foundUser = { email: user.email, userRole: 'student' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(foundUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      await authService.login(user);

      expect(configService.get).toHaveBeenCalledTimes(2);
      expect(configService.get).toHaveBeenCalledWith('ACCESS_TOKEN_SECRET');
      expect(configService.get).toHaveBeenCalledWith('REFRESH_TOKEN_SECRET');
    });
  });

  describe('refreshToken', () => {
    it('should return an access token', async () => {
      let cookie = { jwt: 'refresh_token' };
      // Arrange
      const decoded = { email: 'test@test.com', userRole: 'student' };
      jest.spyOn(jwtService, 'decode').mockReturnValue(decoded);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('access_token');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      const result = await authService.refreshToken(cookie);

      expect(result).toEqual('access_token');
    });

    it('should throw an HttpException when no token is provided', async () => {
      let cookie = { jwt: '' };
      cookie.jwt = '';
      await expect(authService.refreshToken(cookie)).rejects.toThrowError(
        HttpException,
      );
    });

    it('should call decode with the correct parameter', async () => {
      // Arrange
      let cookie = { jwt: 'refresh_token' };
      const decoded = { email: 'test@test.com', userRole: 'user' };
      jest.spyOn(jwtService, 'decode').mockReturnValue(decoded);

      // Act
      await authService.refreshToken(cookie);

      // Assert
      expect(jwtService.decode).toHaveBeenCalledWith(cookie.jwt);
    });
  });
});
