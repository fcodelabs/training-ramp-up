/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();

    const tokenWithColon = request.req.rawHeaders[request.req.rawHeaders.indexOf('Cookie')+1].split(" refreshToken")[0].split("=")[1];
    const length = tokenWithColon.length;

    if (!roles) return true;
    const accessToken = tokenWithColon.substring(0,length-1);

    if (!accessToken) throw new UnauthorizedException('You are not Authorized');
  
    try {
      const decoded = await this.jwtService.verify(accessToken) as JwtPayload
      if (decoded && roles.includes(decoded.user.role)) return true

      throw new ForbiddenException('You are not Authorized')

    } catch (err) {
      throw err
    }
  }
}
