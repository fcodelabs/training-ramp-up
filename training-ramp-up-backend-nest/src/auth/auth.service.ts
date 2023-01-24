import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    try {
      const payload: Payload = {
        name: user.name,
        sub: user.id,
        role: user.role,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: '20m',
          secret: process.env.ACCESS_KEY,
        }),
        refreshToken: this.jwtService.sign(payload, {
          expiresIn: '24h',
          secret: process.env.REFRESH_KEY,
        }),
      };
    } catch (err) {
      throw err;
    }
  }

  async getNewAccessToken(user: string, refreshToken: string) {
    try {
      if (refreshToken) {
        const decodedUser: Payload = await this.jwtService.verify(user, {
          secret: process.env.USER_KEY,
        });

        const decoded: Payload = await this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_KEY,
        });
        const validRefereshToken = decoded.sub == decodedUser.sub;

        if (validRefereshToken) {
          const payload={
            name:decodedUser.name,
            sub:decodedUser.sub,
            role:decodedUser.role
          }
          return {
            accessToken: this.jwtService.sign(payload, {
              expiresIn:'20m',
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

  async getUserDetails(accessToken: string) {
    try {
      const payload: Payload = this.jwtService.verify(accessToken, {
        secret: process.env.ACCESS_KEY,
      });
      if (payload) {
        const user = this.jwtService.sign(payload, {
          secret: process.env.USER_KEY,
        });

        return user;
      } else {
        throw new UnauthorizedException('Access token not found');
      }
    } catch (err) {
      throw err;
    }
  }
}
