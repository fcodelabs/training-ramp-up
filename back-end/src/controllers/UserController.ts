import { Request, Response } from 'express'
import { io } from '../..'
import UserModel from '../models/userModel'
import {
  getUserService,
  addUserService
} from '../services/UserService'

const validate = (user: UserModel) => {
  const nameReg = /^([A-z\s]{3,30})$/
  const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/
  const validPw: boolean = user.password.length >= 8 && /[0-9]/.test(user.password)
  const validConfirmPw: boolean = !validPw || user.password === user.confirmPassword

  if (!nameReg.test(user.userName)) {
    return false
  }
  if (!emailReg.test(user.email)) {
    return false
  }
  if (!validPw) {
    return false
  }
  if (!validConfirmPw) {
    return false
  }
  return true
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserService(req.body)
    if (user !== null) return res.status(200).send(user)
    return res.status(401).send('Email or Password Invalid')
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    if (validate(req.body)) {
      const result = await addUserService(req.body)
      if (result !== null) {
        io.emit(
          'notification',
          'User has been registered.'
        )
        return res.status(200).send(result)
      }
      result === false && res.status(401).send('Email has already been used!!')
    } else {
      return res.status(401).send('Can not add student. Enter Valid Data')
    }
  } catch (err) {
    res.send(`Error: ${err}`)
  }
}
