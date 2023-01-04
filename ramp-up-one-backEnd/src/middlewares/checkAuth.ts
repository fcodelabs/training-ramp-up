import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config';
export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json('No token found');
    }
    const data = jwt.verify(token, config.jwt_secret_key);
    console.log('curunt data-', data);
    // req.body.student=data;
    return next();
  } catch {
    return res.status(403).json('Invalid Token');
  }
};
