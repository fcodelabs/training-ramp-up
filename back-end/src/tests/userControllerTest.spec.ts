/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Request, Response } from 'express'
import { getUser, addUser, signoutUser } from '../controllers/userController'
import UserModel from '../models/userModel'
import * as userServices from '../services/userService'

describe('User Controller Test', () => {
  const response = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    res.cookie = jest.fn().mockReturnValue(res)
    return res
  }

  describe('Get User controller test', () => {
    const userResult = {
      id: 1,
      userName: 'newUserName',
      email: 'newuser@gmail.com',
      password: 'NewUserPw123',
      role: 'Guest'
    } as UserModel

    const req = {
      body: {
        email: 'newuser@gmail.com',
        password: 'NewUserPw123.'
      }
    } as Request

    const res = response()

    test('Get User success', async () => {
      const spyGetUser = jest
        .spyOn(userServices, 'getUserService')
        .mockResolvedValue(userResult)
      await getUser(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.cookie).toHaveBeenCalledTimes(3)
      spyGetUser.mockRestore()
    })
    test('Get User fail', async () => {
      const spyGetUser = jest
        .spyOn(userServices, 'getUserService')
        .mockResolvedValue(null)
      await getUser(req, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Email or Password Invalid')
      spyGetUser.mockRestore()
    })
  })

  describe('Add User controller test', () => {
    const newUser = {
      id: 1,
      userName: 'newUser',
      email: 'newuser@gmail.com',
      password: 'NewUserPw123.',
      role: 'Admin'
    } as UserModel

    const req1 = {
      body: {
        userName: 'NewUser',
        email: 'newuser@gmail.com',
        password: 'NewUserPw123.',
        confirmPassword: 'NewUserPw123.',
        role: 'Admin'

      }
    } as Request

    const req2 = {
      body: {
        userName: 'newUser',
        email: 'newUsergmail.com',
        password: 'NewUserPw123.',
        confirmPassword: 'NewUserPw3.',
        role: 'Admin'

      }
    } as Request

    const res = response()

    test('Add User success', async () => {
      const spyAddUser = jest
        .spyOn(userServices, 'addUserService')
        .mockResolvedValue(newUser)
      await addUser(req1, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.send).toHaveBeenCalledWith(newUser)
      spyAddUser.mockRestore()
    })
    test('Add User fail', async () => {
      const spyAddUser = jest
        .spyOn(userServices, 'addUserService')
        .mockResolvedValue(false)
      await addUser(req1, res)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith('Email has already been used!!')
      spyAddUser.mockRestore()
    })
    test('Add User fail with Invalid Data', async () => {
      // const spyAddUser = jest
      //   .spyOn(userServices, 'addUserService')
      //   .mockResolvedValue(false)
      await addUser(req2, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('Can not add student. Enter Valid Data')
      // spyAddUser.mockRestore()
    })
  })

  describe('Signout User controller test', () => {
    const req = {} as Request

    const res = response()

    test('Signout User success', async () => {
      await signoutUser(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith('User Logged out')
      expect(res.cookie).toHaveBeenCalledTimes(3)
    })
  })
})
