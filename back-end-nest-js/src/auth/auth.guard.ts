/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = await context.switchToHttp().getRequest();

    if (!roles) return true;
    const accessToken = request.cookies.accessToken;
    if (!accessToken) return false;
  
    try {
      const decoded = await this.jwtService.verify(accessToken) as JwtPayload
      if (decoded && roles.includes(decoded.user.role)) return true

      throw new ForbiddenException('You are not Authorized')

    } catch (err) {
      throw err
    }
  }
}
