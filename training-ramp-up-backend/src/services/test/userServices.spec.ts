import {
    addUser,
    getUser,
    isUserAlreadyExist,
} from '../../services/userServices'
import { Student } from '../../models/Student'
import { appDataSource } from '../../configs/dataSourceConfig'
import { User } from '../../models/User'
import bcrypt = require('bcrypt')

describe('User', () => {
    const userRepo = appDataSource.manager

    describe('Add user', () => {
        const user = {
            id: 1,
            name: 'Lasan',
            username: 'lasa',
            password: '123456',
            role: 'User',
        }

        test('Add new user success', async () => {
            userRepo.insert = jest.fn().mockResolvedValue(user)
            const data = await addUser(user)
            expect(data).toEqual(user)
        })

        test('Add new student failed ', async () => {
            userRepo.insert = jest.fn().mockRejectedValue(null)
            const data = await addUser(user)
            expect(data).toEqual({ err: 'Can not and user.Error occured' })
        })
    })

    describe('Get user', () => {
        const user = {
            id: 1,
            name: 'Lasan',
            username: 'lasa',
            password: '123456',
            role: 'User',
        }

        test('Get student success', async () => {
            const username = 'lasa'
            const password = '123456'
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockResolvedValue(user)
            bcrypt.compare = jest.fn().mockResolvedValue(true)
            const data = await getUser(username, password)
            expect(data).toEqual(user)
        })

        test('Get student failed.No user found', async () => {
            const username = 'lasa'
            const password = '123456'
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockResolvedValue(null)
            const data = await getUser(username, password)
            expect(data).toEqual({
                err: 'User Not Found',
            })
        })

        test('Get student failed.Incorrect password', async () => {
            const username = 'lasa'
            const password = '12345'
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockResolvedValue(user)
            bcrypt.compare = jest.fn().mockResolvedValue(false)
            const data = await getUser(username, password)
            expect(data).toEqual({
                err: 'Incorrect Password',
            })
        })

        test('Get student failed', async () => {
            const username = 'lasa'
            const password = '12345'
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockRejectedValue(null)
            const data = await getUser(username, password)
            expect(data).toEqual({
                err: 'Can not get use details.Error occured',
            })
        })
    })

    describe('Check if the user already exists', () => {
        const user = {
            id: 1,
            name: 'Lasan',
            username: 'lasa',
            password: '123456',
            role: 'User',
        }

        test('User Already exists', async () => {
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockResolvedValue(user)
            const data = await isUserAlreadyExist(user.username)
            expect(data).toEqual(true)
        })

        test('User does not exist', async () => {
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockResolvedValue(null)
            const data = await isUserAlreadyExist(user.username)
            expect(data).toEqual(false)
        })

        test('Failed to check whether user exists', async () => {
            userRepo.getRepository(User).findOne = jest
                .fn()
                .mockRejectedValue(null)
            const data = await isUserAlreadyExist(user.username)
            expect(data).toEqual({
                err: 'Failed to check whether user exists.Error occured',
            })
        })
    })
})
