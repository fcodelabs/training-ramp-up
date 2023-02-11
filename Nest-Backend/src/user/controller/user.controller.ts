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
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import * as cookie from 'cookie';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
  async signUp(@Body() user: UserDto, @Res() res: Response): Promise<Response> {
    try {
      const userCreate = await this.userService.signUp(user);
      const [jwtCookie, refreshCookie] = await this.cookieGenerator(
        userCreate.email,
        userCreate.role,
      );
      res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
      return res.status(201).json({
        message: 'User created successfully',
        user: userCreate,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('signin')
  async signIn(@Body() user: UserDto, @Res() res: Response): Promise<Response> {
    try {
      const userCreate = await this.userService.signIn(user);
      const [jwtCookie, refreshCookie] = await this.cookieGenerator(
        userCreate.email,
        userCreate.role,
      );
      res.setHeader('Set-Cookie', [jwtCookie, refreshCookie]);
      return res.status(201).json({
        message: 'User sign in successfully',
        user: userCreate,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('signout')
  async logout(@Res() res: Response): Promise<Response> {
    try {
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
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request): Promise<void> {
    try {
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
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
