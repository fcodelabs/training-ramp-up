/* eslint-disable @typescript-eslint/no-explicit-any */
// isAuthenticated middleware is used to check if the user is authenticated or not.

import { NextFunction } from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    // let token = req.get('Authorization');
    const token = await req.cookies.accessToken;
    if (!token) {
      return res.status(404).json({
        success: false,
        messge: 'Token not found',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email, role } = decoded as any;
    req.body.email = email;
    req.body.role = role;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      messge: 'Token is not valid',
    });
  }
}
