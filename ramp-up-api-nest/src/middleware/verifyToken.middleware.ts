import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    } else {
      const key = this.configService.get<string>('TOKEN_KEY');
      if (req.method == 'GET') {
        try {
          jwt.verify(token, key);
          return next();
        } catch (err) {
          return res.status(401).send('Invalid Token');
        }
      } else {
        try {
          const payload = jwt.verify(token, key);
          if (payload.role !== 'Admin') {
            return res.status(401).send('Unauthorized');
          } else {
            return next();
          }
        } catch (err) {
          return res.status(401).send('Invalid Token');
        }
      }
    }
  }
}
