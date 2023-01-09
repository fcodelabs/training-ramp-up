/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JwtPayload } from '../models/userModel'

dotenv.config()
const refreshsecret = process.env.REFRESH_SECRET ?? ''
const accesssecret = process.env.ACCESS_SECRET ?? ''

const verifyRefresh = (email: string, refreshToken: string | undefined) => {
  try {
    if (refreshToken !== undefined) {
      const decoded = JWT.verify(refreshToken, refreshsecret) as JwtPayload
      console.log(decoded.user.email)
      console.log(email)
      console.log(decoded.user.email === email)
      return decoded.user.email === email
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export const authService = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await req.cookies.accessToken

    if (!accessToken) return res.status(401).send('Access Denied')
    try {
      const decoded = JWT.verify(accessToken, accesssecret) as JwtPayload
      // console.log('decod')
      // console.log(decoded.user.role)
      // console.log(role)
      // console.log(role.includes(decoded.user.role))
      if (!role.includes(decoded.user.role)) {
        return res.status(403).send('You are not authorized')
      }
      if (decoded && role.includes(decoded.user.role)) return next()
    } catch (err) {
      return res.status(400).send('Invalid Accesss Token')
    }
  }
}

export const refreshUser = async (req: Request, res: Response) => {
  try {
    const user = await req.cookies.user
    const refreshToken = await req.cookies.refreshToken
    console.log('user')
    console.log(user)
    const isValid = verifyRefresh(user.email, refreshToken)
    if (!isValid) {
      return res.status(401).send('Invalid refresh Token')
    }

    const accessToken = JWT.sign({ user }, accesssecret, { expiresIn: '2m' })
    // console.log(accessToken)
    return res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 2, httpOnly: true }).status(200)
      .send('Access Token returned')
  } catch (err) {
    return res.status(401).send('Access Token return Failed')
  }
}
