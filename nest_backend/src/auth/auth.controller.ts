import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() signInDto: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const token = await this.authService.signInUser(
        signInDto.email,
        signInDto.password,
      );

      res.cookie('accessToken', token.accessToken, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
      });

      res.cookie('refreshToken', token.refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });

      res.status(200).json({
        message: 'Success Sign In',
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('An error occurred', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refreshToken')
  async getNewAccessToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const refreshToken = req.headers.cookie.split(':')[1];
    try {
      const token = await this.authService.getNewAccessToken(refreshToken);
      res.cookie('newAccessToken', token.accessToken, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
      });
      res.status(200).json({
        message: 'Success Refresh Token',
      });
    } catch (error: any) {
      if (error.message === 'Invalid token') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('An error occurred', HttpStatus.BAD_REQUEST);
      }
    }
  }
}