import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new NotFoundException('Incorrect Password');
      }
    } catch (err) {
      throw err;
    }
  }

  async login(user: any) {
    try {
      const payload: Payload = {
        name: user.name,
        sub: user.id,
        role: user.role,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '5m',
          secret: process.env.ACCESS_KEY,
        }),
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '20m',
          secret: process.env.REFRESH_KEY,
        }),
        user: payload,
      };
    } catch (err) {
      throw err;
    }
  }

  async getNewAccessToken(user: Payload, refreshToken: string) {
    try {
      if (refreshToken) {
        const decoded: Payload = await this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_KEY,
        });
        const validRefereshToken = decoded.sub == user.sub;

        if (validRefereshToken) {
          const payload = {
            username: user.name,
            sub: user.sub,
            role: user.role,
          };
          return {
            accessToken: this.jwtService.sign(payload, {
              expiresIn: '5m',
              secret: process.env.ACCESS_KEY,
            }),
          };
        } else {
          throw new UnauthorizedException('Invalid Refresh token');
        }
      } else {
        throw new UnauthorizedException('Refresh token not found');
      }
    } catch (err) {
      throw err;
    }
  }
}
