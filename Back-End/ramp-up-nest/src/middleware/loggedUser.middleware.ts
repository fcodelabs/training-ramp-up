import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../utils/config';

@Injectable()
export class VerifyLogout implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(403).send('Token not found');
    }
    try {
      jwt.verify(token, config.jwt_secret_key);
      return next();
    } catch (err) {
      return res.sendStatus(403);
    }
  }
}
