import { Request, Response, NextFunction } from 'express';
import { PostgresDataSource } from '../configs/db';
import { User } from '../models/UserModel';
import { handleRefreshTokenService, signInUserService, signUpUser } from './authentication';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Authentication Services Tests', () => {

    describe('sign up user test services', () => {
        const value = {
            id: 1,
            email: 'john@gmail.com',
            password: '00000000',
            role: 'student',
        } as User
        const newUser = {
            id: 1,
            email: 'john@gmail.com',
            password : '4rfv%TGB%',
            role: 'student',
        } as User
        const next = jest.fn() as NextFunction
        // jest.spyOn(bcrypt, 'hash').mockResolvedValue('4rfv%TGB%')
        
        test('should return new user', async () => {
            const spy1 = jest.spyOn(PostgresDataSource.getRepository(User), 'findOneBy').mockResolvedValue(null)
            const spy2 = jest.spyOn(PostgresDataSource.manager, 'save').mockResolvedValue(newUser)
            const newSignedUp = await signUpUser(value, next)
            expect(newSignedUp).toBe(newUser)
            spy1.mockRestore()
            spy2.mockRestore()
        })
        test('should return undefined if a user already exists in the same email', async () => {
            jest.spyOn(PostgresDataSource.getRepository(User), 'findOneBy').mockResolvedValue(null)
            const user = await signUpUser(value, next)
            expect(user).toBe(undefined)
        })
    })

    describe('sign in user test services', () => {
        const next = jest.fn() as NextFunction
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
          send : jest.fn().mockReturnThis(),
        } as unknown as Response
        const req = {
          body: {
            email: 'john@gmail.com',
            password : '0000000',
          },
        } as unknown as Request

        const loggedUser = {
            id: 1,
            email: 'john@gmail.com',
            password : '4rfv%TGB%',
            role: 'student',
        } as User

        test('should return a user', async () => {
            const spy1 = jest.spyOn(PostgresDataSource.getRepository(User), 'findOneBy').mockResolvedValue(loggedUser)
            const spy2 = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
            const newSignedInRole = await signInUserService(req, res, next)
            expect(newSignedInRole).toBe('student')
            spy1.mockRestore()
            spy2.mockRestore()
        })

        test('should return email does not exist', async () => {
            const spy1 = jest.spyOn(PostgresDataSource.getRepository(User), 'findOneBy').mockResolvedValue(null)
            await signInUserService(req, res, next)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith('Email does not exists!')
            spy1.mockRestore()
            
        })

        test('should return password is incorrect', async () => {
            const spy1 = jest.spyOn(PostgresDataSource.getRepository(User), 'findOneBy').mockResolvedValue(loggedUser)
            const spy2 = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
            await signInUserService(req, res, next)
            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.send).toHaveBeenCalledWith('Password is incorrect!')
            spy1.mockRestore()
            spy2.mockRestore()
        })

    })

    describe('Refresh token test services', () => {
        const cookies ={
            jwt : '1111111'
        }
        const decoded ={
            email : 'john@gmail.com'
        }
        test('should return access token',  async () => {
            const spy1 = jest.spyOn(jwt, 'verify').mockResolvedValue(decoded)
            const spy2 = jest.spyOn(jwt, 'sign').mockResolvedValue('2222222')
            const newAccessToken = await handleRefreshTokenService(cookies)
            expect(newAccessToken).toBe('2222222')
        })

        test('should throw error if no token provided', async () => {
            const cookies = {};
            try {
                await handleRefreshTokenService(cookies);
            } catch (error: any) {
                expect(error.message).toBe('No token provided');
            }
            });
    })

})