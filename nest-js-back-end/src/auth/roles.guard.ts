import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = await context.switchToHttp().getRequest();
    if (!roles) {
      return true;
    }
    const accessToken = request.cookies.accessToken;
    if (!accessToken) return false;

    try {
      const decoded = await this.jwtService.verify(accessToken);
      if (decoded && roles.includes(decoded.userRoll)) return true;
      throw new ForbiddenException('You are not Authorized');
    } catch (err) {
      throw err;
    }
  }
}
