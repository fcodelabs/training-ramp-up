import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from './dto/tokens.dto';
import { ValidatedUserDto } from './dto/validatedUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUserDto> {
    const user = await this.userService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rest } = user;
        const result = { data: rest, authorized: true };
        return result;
      }
    }
    return { data: null, authorized: false };
  }

  generateTokens(payload): TokensDto {
    const accessKey = this.configService.get<string>('TOKEN_KEY');
    const refreshKey = this.configService.get<string>('REFRESH_TOKEN_KEY');
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: accessKey,
        expiresIn: '60s',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: refreshKey,
        expiresIn: '24h',
      }),
    };
  }
}
