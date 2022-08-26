import { Test } from '@nestjs/testing';
import * as httpMocks from 'node-mocks-http';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  const result = {
    access_token: 'access',
    refresh_token: 'refresh',
  };
  const mockAuthService = {
    signIn: jest.fn(() => Promise.resolve(result)),
    signUp: jest.fn(() => Promise.resolve(result)),
  };
  const req = httpMocks.createRequest();
  req.res = httpMocks.createResponse();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('signIn', () => {
    it('accept credentials & should return token', async () => {
      expect(await authController.signIn(req, req.res)).toEqual({
        access_token: 'access',
      });
    });
  });

  describe('signUp', () => {
    it('accepts & credentials & should return token', async () => {
      expect(await authController.signUp(req, req.res)).toEqual({
        access_token: 'access',
      });
    });
  });

  describe('movies', () => {
    it('should return moives array', async () => {
      expect(await authController.movies(req)).toEqual(['Avatar', 'Avengers']);
    });
  });
});
