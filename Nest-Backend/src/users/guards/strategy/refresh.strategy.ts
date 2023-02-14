import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: { cookies: { refresh: string } }) => {
        return req?.cookies?.refresh;
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
