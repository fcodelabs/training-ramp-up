import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../utils/config';

@Injectable()
export class UserPermissions implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(400).send('Token not found');
    }
    if (req.method == 'GET') {
      try {
        jwt.verify(token, config.jwt_secret_key);
        return next();
      } catch (err) {
        return res.sendStatus(400).send('Invalid Token');
      }
    } else {
      try {
        const tokenData = jwt.verify(token, config.jwt_secret_key);
        console.log('token Data ', tokenData);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (tokenData.role != 'admin') {
          return res.status(401).send('Do not have Permission');
        } else {
          return next();
        }
      } catch (err) {
        return res.status(401).send('Invalid Token');
      }
    }
  }
}
