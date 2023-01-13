import * as userServices from '../../services/userServices'
import { Request, Response } from 'express'
import { InsertResult } from 'typeorm'
import {
    requestNewAccessToken,
    requestSignIn,
    requestSignOut,
    requestSignUp,
} from '../../controllers/userController'
import * as validateUser from '../../utils/validateUser'
import { User } from '../../models/user'
import jwt = require('jsonwebtoken')

const mockResponse = () => {
    const res = {} as Response
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.sendStatus = jest.fn().mockReturnValue(res)
    res.cookie = jest.fn().mockReturnValue(res)
    return res
}
describe('User Controller', () => {
    describe('Request sign up', () => {
        const user = {
            id: 1,
            name: 'Rashmi',
            username: 'rashi',
            password: '123456',
            role: 'User',
        } as any

        const req = {
            body: {
                name: 'Rashmi',
                username: 'rashi',
                password: '123456',
                role: 'User',
            },
        } as Request

        const res = mockResponse()

        test('Sign up success', async () => {
            const spyValidate = jest
                .spyOn(validateUser, 'validate')
                .mockResolvedValue(true)
            const spyAddUser = jest
                .spyOn(userServices, 'addUser')
                .mockResolvedValue(user)

            await requestSignUp(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith('Registration Successfull')
            spyAddUser.mockRestore()
            spyValidate.mockRestore()
        })
        test('Sign up failed', async () => {
            const spyValidate = jest
                .spyOn(validateUser, 'validate')
                .mockRejectedValue(null)
            const spyAddUser = jest
                .spyOn(userServices, 'addUser')
                .mockRejectedValue(null)
            await requestSignUp(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalledWith(
                'Can not add user.Error occured'
            )
            spyAddUser.mockRestore()
            spyValidate.mockRestore()
        })
    })

    describe('Request sign in', () => {
        const user: User = {
            id: 1,
            name: 'Rashmi',
            username: 'rashi',
            password: '123456',
            role: 'User',
        }

        const req = {
            body: {
                username: 'rashi',
                password: '123456',
            },
        } as Request

        const res = mockResponse()

        test('Sign in success', async () => {
            const spyGetUser = jest
                .spyOn(userServices, 'getUser')
                .mockResolvedValue(user)
            jwt.sign = jest.fn().mockResolvedValue('token')
            await requestSignIn(req, res)

            expect(res.cookie).toHaveBeenCalledTimes(2)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith({ auth: true })

            spyGetUser.mockRestore()
        })

        test('Sign in failed', async () => {
            const spyGetUser = jest
                .spyOn(userServices, 'getUser')
                .mockRejectedValue(null)

            await requestSignIn(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith(
                'Error : Can not sign in.Error occured'
            )

            spyGetUser.mockRestore()
        })
    })

    describe('Request sign out', () => {
        const req = {} as Request

        const res = mockResponse()

        test('Sign out success', async () => {
            await requestSignOut(req, res)

            expect(res.cookie).toHaveBeenCalledTimes(3)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith({
                logOut: true,
            })
        })
    })

    describe('Request new access token', () => {
        const user = {
            id: 1,
            name: 'Rashmi',
            role: 'User',
        }

        const req = {
            cookies: {
                user: user,
                refreshToken: '123456',
            },
        } as Request

        const res = mockResponse()

        test('Request new access token success', async () => {
            jwt.verify = jest.fn().mockResolvedValue(user)
            jwt.sign = jest.fn().mockResolvedValue('New access token')

            await requestNewAccessToken(req, res)

            expect(res.cookie).toHaveBeenCalledTimes(1)
            expect(res.sendStatus).toHaveBeenCalledWith(200)
        })
    })
})
