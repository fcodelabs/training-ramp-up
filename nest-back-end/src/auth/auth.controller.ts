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
    const newUser = new User();
    newUser.email = signUpDto.email;
    newUser.password = signUpDto.password;
    newUser.role = 'student';
    const newCreatedUser = await this.authService.signUp(newUser);
    this.logger.log('newly created user');
    this.logger.log(newCreatedUser);
    if (newCreatedUser) {
      return res.status(201).json('sign up success');
    } else {
      return res.status(200).json('Email already exists');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
