import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { refreshTokenExtractor } from '../cookieExtractor';
import { TokenPayloadDto } from '../dto/tokenPayload.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshTokenStrategy',
) {
  constructor(private configService: ConfigService) {
    const secreteKey = configService.get<string>('REFRESH_TOKEN_KEY');
    super({
      jwtFromRequest: refreshTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: secreteKey,
    });
  }

  async validate(payload: TokenPayloadDto) {
    return { email: payload.email, admin: payload.admin };
  }
}
