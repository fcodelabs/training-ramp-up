import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              switch (key) {
                case 'TOKEN_KEY':
                  return 'Abcd@1234';
                case 'REFRESH_TOKEN_KEY':
                  return 'abcD@1234';
              }
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('validateUser', () => {
    const email = 'test@gmail.com';
    const password = 'Abcd@1234';
    const expectedFindOneResponse = {
      email: 'test@gmail.com',
      firstName: 'test name',
      lastName: 'test name',
      password: 'Abcd@1234',
      admin: true,
    };
    it('Should return user authentication details', async () => {
      const expectedResponse = {
        data: {
          email: 'test@gmail.com',
          firstName: 'test name',
          lastName: 'test name',
          admin: true,
        },
        authorized: true,
      };
      jest
        .spyOn(usersService, 'findOne')
        .mockResolvedValueOnce(expectedFindOneResponse);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        return true;
      });
      const response = await authService.validateUser(email, password);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return authorized:false for wrong password', async () => {
      const expectedResponse = {
        data: null,
        authorized: false,
      };
      jest
        .spyOn(usersService, 'findOne')
        .mockResolvedValueOnce(expectedFindOneResponse);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        return false;
      });
      const response = await authService.validateUser(email, password);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return authorized:false for wrong email', async () => {
      const expectedResponse = {
        data: null,
        authorized: false,
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        return false;
      });
      const response = await authService.validateUser(email, password);
      expect(response).toEqual(expectedResponse);
    });

    it('Should return error for error in findOne', async () => {
      const error = new Error('Error in findOne');
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(error);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        return false;
      });
      try {
        const response = await authService.validateUser(email, password);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('genereateToken', () => {
    const testPayload = {
      email: 'test@gmail.com',
      admin: false,
    };
    const tokens = {
      accessToken: 'token1',
      refreshToken: 'token2',
    };
    it('Should return accessToken and refreshtoken', () => {
      jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => {
          return 'token1';
        })
        .mockImplementationOnce(() => {
          return 'token2';
        });
      const response = authService.generateTokens(testPayload);
      expect(response).toEqual(tokens);
    });
  });
});
