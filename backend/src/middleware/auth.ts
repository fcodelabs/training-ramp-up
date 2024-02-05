/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type NextFunction, type Request, type Response } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookie = req.headers.cookie!;
    const token = cookie.split('=')[1];
    if (token === null) {
      res.status(401).json({ message: 'Unauthorized1' });
      return;
    }
    const decoded = jwt.verify(token, SECRET_KEY, (error, data) => {
      if (error !== null) {
        res.status(401).json({ message: 'Unauthorized2' });
        return;
      }
      (data as jwt.JwtPayload).user.role === 'Admin'
        ? next()
        : res.status(401).json({ message: 'Unauthorized3' });
    });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized4' });
  }
};
