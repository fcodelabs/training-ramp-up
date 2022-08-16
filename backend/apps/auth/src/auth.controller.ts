import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(JwtAuthGuard)
  @Post('signup')
  async signUp(@Req() req: Request): Promise<any> {
    return this.authService.signUp(req.body);
  }

  @Post('login')
  async signIn(@Req() req: Request) {
    return this.authService.signIn(req.body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logOut(@Req() req: Request) {
    this.authService.logOut(req.user['email']);
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    console.log(req.user);
    const email = req.user['email'];
    const refreshToken = req.user['refreshToken'].toString();
    return this.authService.refreshToken(email, refreshToken);
  }


}
