import { NextFunction, Request, Response } from 'express';

interface User {
  role: string;
}

export function roleCheck(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    const user = req.user as User;
    if (user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
