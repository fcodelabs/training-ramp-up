import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(loginDto);
    res
      .cookie('jwt', user.refresh_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,

        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        accessToken: user.access_token,
        email: user.email,
        userRole: user.userRole,
      });
  }

  @Get('refresh')
  async refresh(@Request() req, @Res() res: Response) {
    const cookie = req.cookies;
    console.log(cookie, 'cookie');

    if (!cookie) {
      res.status(403).json({
        message: 'Unauthorized',
      });
    }
    const access_token = await this.authService.refreshToken(cookie);
    res.status(200).json({
      accessToken: access_token,
    });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: 'You have been successfully logged out' });
  }
}
