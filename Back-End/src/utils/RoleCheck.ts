/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function RoleCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get('Authorization')?.split(' ')[1];
    const userRole: any = req.get('Roles');
    console.log(userRole);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this route',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    const { role } = decoded as any;
    console.log(role);
    if (!userRole.includes(role)) {
      return res.status(401).json({
        success: false,
        message: 'You not authorized to access this route',
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'You are nt authorized to access this route',
    });
  }
}
