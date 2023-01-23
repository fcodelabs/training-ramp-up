import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const permissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('request has come...!');
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(403).json('No token found');
    }

    if (req.method === 'GET') {
      try {
        const data: any = jwt.verify(token, config.jwt_secret_key);
        return next();
      } catch {
        return res.status(403).json('Invalid Token');
      }
    } else {
      try {
        const data: any = jwt.verify(token, config.jwt_secret_key);
        if (data.userRoll !== 'Admin') {
          return res.status(403).send('Do not have Permission');
        } else {
          return next();
        }
      } catch {
        return res.status(403).json('Invalid Token');
      }
    }
  } catch (err) {
    console.log(err);
  }
};
