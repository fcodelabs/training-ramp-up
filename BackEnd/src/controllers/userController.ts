import { Request, Response, NextFunction } from 'express'
import { signInUserService, signUpUser } from '../services/authentication'
const { validateSignup, validateSignIn } = require('./validator')

export async function signUpNewUser(req: Request, res: Response, next: NextFunction) {
  const{error, value } = validateSignup(req.body)
    if(!error){
      try{
      const newUser = await signUpUser(value, next)
      if(newUser){
        return res.status(201).json(newUser?.email)  
      }else{
        return res.send('Email already exists!')
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
        const loggedUser = await signInUserService(value, next)
        if(loggedUser){
          res.send('success')
        }else{
          return res.send('User does not exists!')
        }
      } catch(err: any){
        next(err)
      }
    }else{
      console.error(error.details)
      return res.send(error.message)
    }
}