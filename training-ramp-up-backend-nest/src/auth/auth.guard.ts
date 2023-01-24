import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const accessToken = request.cookies.accessToken;

    try {
      if (accessToken) {
        const decoded = (await this.jwtService.verify(accessToken, {
          secret: process.env.ACCESS_KEY,
        })) as Payload;
        if (decoded) {
          if (roles.includes(decoded.role)) {
            return true;
          } else {
            throw new UnauthorizedException('You are not authorized to access');
          }
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        throw new ForbiddenException('Access token not found');
      }
    } catch (err) {
      throw err;
    }
  }
}
