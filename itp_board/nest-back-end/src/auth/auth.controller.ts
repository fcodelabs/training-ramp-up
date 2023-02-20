import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateUserValidationPipe } from '../users/pipes/create-user-validation/create-user-validation.pipe';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    if (req.user.data) {
      const tokens = this.authService.login(req.user);
      response
        .cookie('accessToken', tokens.accessToken, {
          httpOnly: false,
          secure: false,
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        })
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: false,
          secure: false,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json(req.user);
    } else {
      response.json(req.user);
    }
  }

  @Post('signup')
  async signUp(
    @Body(CreateUserValidationPipe) createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signedUpUser = await this.userService.create(createUserDto);
    const { email, admin } = signedUpUser;
    const tokens = this.authService.generateTokens({ email, admin });
    response
      .cookie('accessToken', tokens.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000,
      })
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(signedUpUser);
  }

  @Delete('signout')
  signOut(@Request() req, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken').clearCookie('refreshToken');
  }

  @UseGuards(RefreshTokenGuard)
  @Post('updatetoken')
  @HttpCode(200)
  async updateToken(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = this.authService.generateTokens(req.user);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: 5 * 60 * 1000,
    });
  }
}
