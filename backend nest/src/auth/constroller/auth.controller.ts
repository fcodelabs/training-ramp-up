import { RefreshTokenGuard } from './../../guards/authGuard/refreshToken.guard';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(
    private userService: AuthService,
    private jwtService: JwtService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUpUser(@Body() newStudent: LoginUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newStudent.Password, salt);
      newStudent.Password = hashedPassword;
      const user = await this.userService.signUpUser(newStudent);
      return user;
    } catch (err) {
      if (err.code === '23505')
        throw new ForbiddenException('user already exits');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(
    @Body() newStudent: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.getUserByEmail(newStudent.Email);
    if (!user) throw new ForbiddenException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(
      newStudent.Password,
      user.Password,
    );
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');
    const { accessToken, refreshToken } = await this.getTokens(
      user.Role,
      user.Email,
    );
    // set the JWT token in a cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 3600 * 1000, // 1 hour in milliseconds
    });
    return {
      accessToken: accessToken,
      user: { Role: user.Role, Email: user.Email },
    };
  }

  @Post('/logout')
  async logOutUser() {
    // return this.userService.logOutUser();
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refreshToken(@Req() req: any) {
    const user = await this.userService.getUserByEmail(req.user.Email);
    const { accessToken } = await this.getTokens(user.Role, user.Email);
    return accessToken;
  }

  async getTokens(Role: string, Email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { Role, Email },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: '3s',
        },
      ),
      this.jwtService.signAsync(
        { Email },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
