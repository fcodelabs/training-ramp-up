import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => {
          // console.log('inside refresh token strategy1 ' + req.cookies.jwt);
          let token = null;
          if (req && req.cookies) {
            token = req.cookies.jwt;
          }
          return token;
        },
      ]),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    // const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const refreshToken = req.cookies.jwt;
    return { ...payload, refreshToken };
  }
}
