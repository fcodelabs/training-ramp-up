import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import * as cookie from 'cookie';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/service/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async cookieGenerator(email: string, role: string): Promise<string[]> {
    const jwtToken = await this.jwtService.signAsync(
      { email, role },
      { expiresIn: '15m', secret: process.env.JWT_SECRET },
    );
    const refreshToken = await this.jwtService.signAsync(
      { email, role },
      {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      },
    );
    const jwtCookie = cookie.serialize('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 900,
    });

    const refreshCookie = cookie.serialize('refresh', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 86400,
    });
    return [jwtCookie, refreshCookie];
  }

  @Post('signup')
  async signUp(@Body() user: AuthDto, @Res() res: Response): Promise<Response> {
    const userCreate = await this.userService.create(user);
    const [jwtCookie, refreshCookie] = await this.cookieGenerator(
      userCreate.email,
      userCreate.role,
    );
    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    return res.status(201).json({
      message: 'User created successfully',
      user: userCreate,
    });
  }

  @Post('signin')
  async signIn(@Body() user: AuthDto, @Res() res: Response): Promise<Response> {
    const userCreate = await this.authService.signIn(user);
    const [jwtCookie, refreshCookie] = await this.cookieGenerator(
      userCreate.email,
      userCreate.role,
    );
    res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
    return res.status(201).json({
      message: 'User sign in successfully',
      user: userCreate,
    });
  }

  @Delete('signout')
  async logout(@Res() res: Response): Promise<Response> {
    res.setHeader('Set-Cookie', [
      cookie.serialize('jwt', '', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 0,
      }),
      cookie.serialize('refresh', '', {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 0,
      }),
    ]);
    return res.status(200).json({
      message: 'User logged out successfully',
    });
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request): Promise<void> {
    const refresh = req.cookies.refresh;
    if (!refresh) {
      throw new HttpException('Refresh token not found', 401);
    }
    const { email, role } = this.jwtService.verify(refresh, {
      secret: process.env.JWT_SECRET,
    });
    const [jwtCookie] = await this.cookieGenerator(email, role);
    res.setHeader('Set-Cookie', [jwtCookie]);
    res.status(200).json({ message: 'User refreshed successfully' });
  }
}
