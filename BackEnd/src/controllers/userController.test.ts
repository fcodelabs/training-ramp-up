import * as userServices from '../services/authentication'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/UserModel'
import { signUpNewUser, signInUser, refreshTokenHandler, logoutUser } from '../controllers/userController'

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
                confirmPassword : '4rfv%TGB%',
            },
        } as unknown as Request
        test('should return success message', async () => {
            const spySignUpNewUser = jest
                .spyOn(userServices, 'signUpUser')
                .mockResolvedValue(user2)
            await signUpNewUser(req, res, next)
            expect(spySignUpNewUser).toHaveBeenCalledWith(req.body, next)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith('sign up success')
        })

        test('should return error message', async () => {
            const spySignUpNewUser = jest
                .spyOn(userServices, 'signUpUser')
                .mockResolvedValue(null)
            await signUpNewUser(req, res, next)
            expect(res.json).toHaveBeenCalledWith('Email already exists!')
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
        const signInUserService = jest.fn();

        test('sign in user successfully', async () => {
            const spySignInUser = jest
                .spyOn(userServices, 'signInUserService')
                .mockResolvedValue('student')
            await signInUser(req, res, next)
            expect(spySignInUser).toHaveBeenCalledWith(req, res, next)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.cookie).toBeCalledTimes(1)
            expect(res.status).toBeCalledTimes(1)
        })

        // test('should return error message', async () => {
        //     const spySignInUser = jest
        //         .spyOn(userServices, 'signInUserService')
        //         .mockResolvedValue(null)
        //     await signInUser(req, res, next)
        //     expect(res.json).toHaveBeenCalledWith('Invalid email or password')
        // })

        // it('should call next with error if sign in is unsuccessful', async () => {
        //     const req = {
        //         body: {
        //             email: 'janegmail.com',
        //             password: '4rfv%TGB%',
        //         },
        //     } as unknown as Request
        //     await signInUser(req, res, next)
        //     expect(res.json).toHaveBeenCalledWith('"email" must be a valid email')
        //   });
    })

    // describe('Refresh Token Test', () => {
    //     const next = jest.fn() as NextFunction
    //     const res = {
    //         status: jest.fn().mockReturnThis(),
    //         cookie: jest.fn().mockReturnThis(),
    //         json: jest.fn().mockReturnThis(),
    //     } as unknown as Response
    //     const req = {
    //         body: {
    //             email: 'jane@gmail.com',
    //             password: '4rfv%TGB%',
    //         },
    //     } as unknown as Request


    //     test('calls handleRefreshToken with the correct parameters', () => {
    //         const result = jest.spyOn(userServices, 'handleRefreshToken').mockResolvedValue(true)
    //       });
    // })
})