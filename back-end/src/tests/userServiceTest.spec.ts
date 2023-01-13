/* eslint-disable @typescript-eslint/consistent-type-assertions */
import User from '../entity/user'
import UserModel, { LoginUserModel } from '../models/userModel'
import DatabaseService from '../services/databaseService'
import {
  getUserService,
  addUserService
} from '../services/userService'
import bcrypt from 'bcrypt'

describe('User Service Test', () => {
  const userLoginData = {
    email: 'user@gmail.com',
    password: 'UserPw123.'
  } as LoginUserModel

  const userResult = {
    id: 1,
    userName: 'userName',
    email: 'user@gmail.com',
    password: 'UserPw123.',
    role: 'Admin'
  } as UserModel

  describe('Get User service test', () => {
    test('Get User success', async () => {
      DatabaseService.getRepository(User).findOneBy = jest.fn().mockResolvedValue(userResult)
      bcrypt.compare = jest.fn().mockResolvedValue(true)
      const result = await getUserService(userLoginData)
      expect(result).toEqual(userResult)
    })
    test('Get User fail with invalid email', async () => {
      DatabaseService.getRepository(User).findOneBy = jest.fn().mockResolvedValue(null)
      // bcrypt.compare = jest.fn().mockResolvedValue(true)
      const result = await getUserService(userLoginData)
      expect(result).toEqual(null)
    })
    test('Get User fail with invalid password', async () => {
      DatabaseService.getRepository(User).findOneBy = jest.fn().mockResolvedValue(userResult)
      bcrypt.compare = jest.fn().mockResolvedValue(false)
      const result = await getUserService(userLoginData)
      expect(result).toEqual(null)
    })
  })

  describe('Add User service test', () => {
    const addUser = {
      userName: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      confirmPassword: 'NewU1234',
      role: 'Admin'
    } as UserModel

    const addUserResult = {
      id: 1,
      userName: 'newUser',
      email: 'newUser@gmail.com',
      password: 'NewU1234',
      confirmPassword: 'NewU1234',
      role: 'Admin'
    } as UserModel

    test('Add User success', async () => {
      DatabaseService.getRepository(User).findOneBy = jest.fn().mockResolvedValue(null)
      DatabaseService.getRepository(User).save = jest.fn().mockResolvedValue(addUserResult)
      const result = await addUserService(addUser)
      expect(result).toEqual(addUserResult)
    })
    test('Add User fail', async () => {
      DatabaseService.getRepository(User).findOneBy = jest.fn().mockResolvedValue(!null)
      // DatabaseService.getRepository(User).save = jest.fn().mockResolvedValue(addUser)
      const result = await addUserService(addUser)
      expect(result).toEqual(false)
    })
  })
})
