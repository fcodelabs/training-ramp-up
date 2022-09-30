import { Body, Controller, Post, Response, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { RefreshTokenDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
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
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto, @Response() res) {
    const result = await this.authService.refresh(body.refreshToken);
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

  @Delete('logout')
  async logout(@Body() body: { sessionId: string }, @Response() res) {
    const result = await this.authService.logout(body.sessionId);

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
    res.send({ message: 'User has been authenticated!' });
    return;
  }
}
