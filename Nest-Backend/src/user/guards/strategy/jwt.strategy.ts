import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: { cookies: { jwt: string } }) => {
        return req?.cookies?.jwt;
      },
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    email: string;
    role: string;
  }): Promise<{ email: string; role: string }> {
    return { email: payload.email, role: payload.role };
  }
}
