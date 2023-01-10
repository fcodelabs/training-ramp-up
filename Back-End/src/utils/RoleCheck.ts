/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function RoleCheck(role: Array<string>) {
  // console.log(role);
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // let token = req.get('Authorization');
      const token = await req.cookies.accessToken;
      if (!token) {
        return res.status(404).json({
          success: false,
          messge: 'Token not found',
        });
      }
      // token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      // console.log(decoded);
      const { role: userRole } = decoded as any;
      if (!role.includes(userRole)) {
        return res.status(401).json({
          success: false,
          messge: 'You are not authorized to access this route',
        });
      }
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        messge: 'Token is not valid',
      });
    }
  };
}
