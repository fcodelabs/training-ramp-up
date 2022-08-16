import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(JwtAuthGuard)
  @Post('signup')
  async signup(@Request() req): Promise<any> {
    return this.authService.signup(req.body);
  }

}
