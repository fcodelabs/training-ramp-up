import { Request, Response } from 'express'
import UserModel from '../models/userModel'
import {
  getUserService,
  addUserService
} from '../services/userService'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'

dotenv.config()
const refreshsecret = process.env.REFRESH_SECRET ?? ''
const accesssecret = process.env.ACCESS_SECRET ?? ''

export const validate = (user: UserModel) => {
  const nameReg = /^([A-z\s]{3,30})$/
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/
  const validPw: boolean = user.password.length >= 8 && /[0-9]/.test(user.password)
  const validConfirmPw: boolean = !validPw || user.password === user.confirmPassword

  if (!nameReg.test(user.userName)) {
    return false
  }
  if (!emailReg.test(user.email)) {
    // console.log('email', emailReg.test(user.email))
    return false
  }
  if (!validPw) {
    return false
  }
  if (!validConfirmPw) {
    return false
  }
  if (user.role === '') {
    return false
  }
  return true
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user: any = await getUserService(req.body)
    if (user !== null && user !== undefined) {
      const accessToken = JWT.sign({ user },
        accesssecret, { expiresIn: '2m' })
      const refreshToken = JWT.sign({ user },
        refreshsecret, { expiresIn: '20m' })
      res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 2, httpOnly: true })
      res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 20, httpOnly: true })
      res.cookie('user', user, { maxAge: 1000 * 60 * 20, httpOnly: false })
      res.status(200).send(user)
      return
    }

    return res.status(401).send('Email or Password Invalid')
  } catch (err) {
    res.status(403).send(`Error: ${err}`)
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    // console.log(validate(req.body))
    // console.log(req.body)
    if (validate(req.body)) {
      const result = await addUserService(req.body)
      if (result !== false) {
        return res.status(201).send(result)
      } else {
        return res.status(401).send('Email has been already used!!')
      }
    } else {
      return res.status(400).send('Can not add student. Enter Valid Data')
    }
  } catch (err) {
    res.status(403).send(`Error: ${err}`)
  }
}

export const signoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie('accessToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('refreshToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('user', '', { maxAge: -1, httpOnly: false })
    res.status(200).send('User Logged out')
  } catch (err) {
    res.status(403).send(`Error: ${err}`)
  }
}
