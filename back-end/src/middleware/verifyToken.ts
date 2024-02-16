/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { type Request, type Response, type NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dataSource from '../config/dataSource';
import { User } from '../models/user';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookie = req.headers.cookie as string;
    const token = cookie.split('=')[1];
    if (token === null) {
      res.status(401).json({ userDetails: null });
    } else {
      let email = '';
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET ?? '');
      email = decodedToken.email;
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      if (user === null) {
        res.status(404).json({ userDetails: null });
      } else {
        req.body.user = user;
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ userDetails: null });
  }
};
