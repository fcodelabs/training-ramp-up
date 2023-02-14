/* eslint-disable prettier/prettier */
import { cookieExtractor } from './cookieExtractor';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  //private readonly authService: AuthService
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET || 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    return payload;
  }
}
