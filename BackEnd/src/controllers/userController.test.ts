import * as userServices from '../services/authentication'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/UserModel'
import {
  signUpNewUser,
  signInUser,
  refreshTokenHandler,
  logoutUser,
} from '../controllers/userController'

describe('User Controller tests', () => {
  const user1 = {
    id: 1,
    email: 'john@gmail.com',
    password: '4rfv%TGB%',
    role: 'admin',
  } as User
  const user2 = {
    id: 2,
    email: 'jane@gmail.com',
    password: '4rfv%TGB%',
    role: 'student',
  } as User

  describe('Sign Up New User Test', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        email: 'jane@gmail.com',
        password: '4rfv%TGB%',
        confirmPassword: '4rfv%TGB%',
      },
    } as unknown as Request
    test('should return success message', async () => {
      const spySignUpNewUser = jest.spyOn(userServices, 'signUpUser').mockResolvedValue(user2)
      await signUpNewUser(req, res, next)
      expect(spySignUpNewUser).toHaveBeenCalledWith(req.body, next)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith('sign up success')
      spySignUpNewUser.mockRestore()
    })

    test('should return error message', async () => {
      const spySignUpNewUser = jest.spyOn(userServices, 'signUpUser').mockResolvedValue(null)
      await signUpNewUser(req, res, next)
      expect(res.json).toHaveBeenCalledWith('Email already exists!')
      spySignUpNewUser.mockRestore()
    })
  })

  describe('Sign In User Test', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        email: 'jane@gmail.com',
        password: '4rfv%TGB%',
      },
    } as unknown as Request
    const signInUserService = jest.fn()

    test('sign in user successfully', async () => {
      const spySignInUser = jest
        .spyOn(userServices, 'signInUserService')
        .mockResolvedValue('student')
      await signInUser(req, res, next)
      expect(spySignInUser).toHaveBeenCalledWith(req, res, next)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.cookie).toBeCalledTimes(1)
      expect(res.status).toBeCalledTimes(1)
      spySignInUser.mockRestore()
    })

    test('should throw an error', async () => {
      const spySignInUser = jest.spyOn(userServices, 'signInUserService').mockImplementation(() => {
        throw new Error('Error')
      })
      await signInUser(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('Error'))
      expect(spySignInUser).toHaveBeenCalledTimes(1)
      spySignInUser.mockRestore()
    })
  })

  describe('Logout User Test', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        email: 'jane@gmail.com',
        password: '4rfv%TGB%',
      },
      cookies: {
        jwt: '111111111111',
      },
    } as unknown as Request

    test('should return "Logout successful" message if token is provided', () => {
      const req = { cookies: { jwt: '1112222' } } as unknown as Request
      const res = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
        clearCookie: jest.fn(),
      } as unknown as Response
      const next = jest.fn() as NextFunction

      logoutUser(req, res, next)

      expect(res.clearCookie).toHaveBeenCalledWith('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      expect(res.status).toHaveBeenCalledWith(205)
      expect(res.status(205).send).toHaveBeenCalledWith('Logout successful')
    })

    test('should return no token provided', async () => {
      req.cookies = {}
      res.status = jest.fn().mockImplementation(() => {
        return {
          send: jest.fn().mockImplementation(() => {}),
        }
      })
      logoutUser(req, res, next)
      expect(res.status).toHaveBeenCalledWith(401)
    })
  })

  describe('Refresh Token Test', () => {
    const next = jest.fn() as NextFunction
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response
    const req = {
      body: {
        email: 'jane@gmail.com',
        password: '4rfv%TGB%',
      },
      cookies: {
        jwt: '111111111111',
      },
    } as unknown as Request
    test('should handle refresh tokens', async () => {
      const spy = jest.spyOn(userServices, 'handleRefreshTokenService').mockResolvedValue('1111111')
      await refreshTokenHandler(req, res, next)
      expect(res.json).toHaveBeenCalledWith('1111111')
      expect(res.json).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })

    test('should throw error if no token provided', async () => {
      const spy = jest.spyOn(userServices, 'handleRefreshTokenService').mockImplementation(() => {
        throw new Error('No token provided')
      })
      await refreshTokenHandler(req, res, next)
      expect(next).toHaveBeenCalledWith(new Error('No token provided'))
      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })
})
