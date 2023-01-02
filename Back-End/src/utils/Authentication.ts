/* eslint-disable @typescript-eslint/no-explicit-any */
// isAuthenticated middleware is used to check if the user is authenticated or not.

import { NextFunction } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.get('Authorization');
    if (!token) {
      return res.status(404).json({
        success: false,
        messge: 'Token not found',
      });
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email } = decoded as any;
    req.body.email = email;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      messge: 'Token is not valid',
    });
  }
}
