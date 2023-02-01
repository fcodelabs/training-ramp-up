import { Request, Response } from 'express'
import { signUpUser } from '../services/authentication'

export function signUpNewUser(req: Request, res: Response) {
  signUpUser(req, res)
  }