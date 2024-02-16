/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { type Request, type Response, type NextFunction } from 'express';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.body.user;
    if (user === null) {
      res.status(401).json({ userDetails: null });
    } else {
      if (user.role !== 'Admin') {
        res.status(403).json({ userDetails: null });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ userDetails: null });
  }
};
