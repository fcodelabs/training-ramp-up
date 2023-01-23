/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

@Injectable()
export class authorization implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      res.sendStatus(403);
      return;
    }
    try {
      jwt.verify(token, config.jwt_secret_key);
      return next();
    } catch (err) {
      res.sendStatus(403);
    }
  }
}
