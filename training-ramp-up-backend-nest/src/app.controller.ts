import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { Payload } from './auth/interfaces';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.login(req.user);
    res.cookie('accessToken', result.accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });

    res.cookie('user', result.user, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });

    res.send({ auth: true });
  }

  @Post('auth/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const user:Payload = req.cookies.user;
    const refreshToken:string = req.cookies.refreshToken;
    const result = await this.authService.getNewAccessToken(user, refreshToken);
    res.cookie('accessToken', result.accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
  }

  @Post('auth/signout')
  async signout(@Req() req: Request, @Res() res: Response) {
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('user', '', {
      maxAge: 0,
      httpOnly: false,
    });
    res.status(200).send({
      logOut: true,
    });
  }
}
