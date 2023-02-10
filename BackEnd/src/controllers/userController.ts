import { Request, Response, NextFunction } from 'express'
import { signInUserService, signUpUser, handleRefreshToken } from '../services/authentication'
const { validateSignup, validateSignIn } = require('./validator')
const jwt = require('jsonwebtoken');
require('dotenv').config();

export async function signUpNewUser(req: Request, res: Response, next: NextFunction) {
  const{error, value } = validateSignup(req.body)
    if(!error){
      try{
      const newUser = await signUpUser(value, next)
      if(newUser){
        return res.status(201).json('sign up success')  
      }else{
        return res.json('Email already exists!')
      }
      } catch( err ){
        next(err)
      }
    }else{
      console.error(error.details)
      return res.send(error.message)
    }
}

export async function signInUser(req: Request, res: Response, next: NextFunction){
 
    const{error, value} = validateSignIn(req.body)
    if(!error){
      try{
        const role =await signInUserService(req, res, next)
        console.log('role :',role)
        if(role == 'student' || role == 'admin'){
          //JWT Token
          const accessToken = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
          const refreshToken = jwt.sign({email: req.body.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
          console.log('line 37 : ')
          res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000})
          const resObj = {
              accessToken: accessToken,
              role: role,
              email: req.body.email
          }
          return res.status(200).json(resObj)
        }
      } catch(err: any){
        next(err)
      }
    }else{
      console.error(error.details)
      return res.send(error.message)
    }
}

export function refreshTokenHandler(req: Request, res: Response, next: NextFunction){
    return handleRefreshToken(req, res, next)
}

export function logoutUser(req: Request, res: Response, next: NextFunction){
    // return handleLogout(req, res, next)
    const cookies = req.cookies
    if(!cookies.jwt) return res.status(401).send('No token provided')
    console.log('cookies ', cookies)
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000})
    res.status(205).send('Logout successful')
}