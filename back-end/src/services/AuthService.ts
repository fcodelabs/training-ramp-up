/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import JWT, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const refreshsecret = process.env.REFRESH_SECRET ?? ''
const accesssecret = process.env.ACCESS_SECRET ?? ''

const verifyRefresh = (email: string, refreshToken: string | undefined) => {
  try {
    if (refreshToken !== undefined) {
      const decoded = JWT.verify(refreshToken, refreshsecret) as JwtPayload
      // console.log(decoded.email)
      return decoded.email === email
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export const authService = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('Authorization')

  if (!accessToken) return res.status(401).send('Access Denied')
  try {
    const verified = JWT.verify(accessToken, accesssecret)
    // req.email = verified.email
    next()
  } catch (err) {
    return res.status(400).send('Invalid Token')
  }
}

export const refreshUser = async (req: Request, res: Response) => {
  const user = req.body
  const refreshToken = req.get('Authorization')
  const isValid = verifyRefresh(user, refreshToken)
  if (!isValid) {
    return res.status(401).send('Invalid Token')
  }

  const accessToken = JWT.sign({ user }, accesssecret, { expiresIn: '2m' })
  // console.log(accessToken)

  return res.header('accesskey', accessToken).status(200).send('Access Token returned')
}
