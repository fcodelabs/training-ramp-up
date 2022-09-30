import {
  Body,
  Controller,
  Post,
  Response,
  Req,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto, @Response() res) {
    const result = await this.authService.login(body.email, body.password);
    if (!result) {
      return res.status(400).send('Invalid Credentials!');
    }
    res.cookie('accessToken', result.accessToken, {
      maxAge: 300000,
      httpOnly: true,
    });
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
    });
    res.cookie('userData', result.userData, {
      maxAge: 300000,
    });
    res.status(200);
    res.send({
      message: 'User has been authenticated!',
    });
    return;
  }

  @Post('/refresh')
  async refreshToken(@Req() req, @Response() res) {
    const result = await this.authService.refresh(req.cookies.refreshToken);
    if (!result) {
      return res.status(400).send('Unauthorized!');
    }
    res.cookie('accessToken', result.accessToken, {
      maxAge: 300000,
      httpOnly: true,
    });
    res.cookie('userData', result.userData, {
      maxAge: 300000,
    });
    res.status(200);
    res.send({
      message: 'User has been re-authenticated!',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/logout/:sessionId')
  async logout(@Req() req: any, @Response() res) {
    const result = await this.authService.logout(req.params.sessionId);

    if (result.error) {
      return res.status(400).send('Failed to logout!');
    }
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('userData', '', {
      maxAge: 0,
    });
    res.status(200);
    res.send('User has been logged out!');
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status')
  status(@Response() res) {
    res.status(200);
    res.send({ message: 'User already authenticated!' });
    return;
  }
}
