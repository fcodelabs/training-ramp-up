import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const newCreatedUser = await this.authService.signUp(signUpDto);
    this.logger.log(newCreatedUser);
    if (newCreatedUser) {
      return res.status(201).json('sign up success');
    } else {
      return res.status(200).json('Email already exists');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req, @Res() res: Response) {
    const obj = await this.authService.login(req.user);
    res.cookie('jwt', obj.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    const { refresh_token, ...result } = obj;
    return res.status(201).json(result);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  async refresh(@Request() req) {
    // const refreshToken = req.user.refreshToken;
    const refreshToken = req.cookies.jwt;
    return this.authService.refreshTokens(refreshToken);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.status(200).json('logout success');
  }
}
