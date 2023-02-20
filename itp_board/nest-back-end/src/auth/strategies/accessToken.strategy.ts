import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { accessTokenExtractor } from '../cookieExtractor';
import { TokenPayloadDto } from '../dto/tokenPayload.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessTokenStrategy',
) {
  constructor(private configService: ConfigService) {
    const secreteKey = configService.get<string>('TOKEN_KEY');

    super({
      jwtFromRequest: accessTokenExtractor,
      ignoreExpiration: false,
      secretOrKey: secreteKey,
    });
  }

  async validate(payload: TokenPayloadDto) {
    return { email: payload.email, admin: payload.admin };
  }
}
