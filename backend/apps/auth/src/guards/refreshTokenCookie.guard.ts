import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenCookieGuard extends AuthGuard('jwt-refresh-cookie') { }
