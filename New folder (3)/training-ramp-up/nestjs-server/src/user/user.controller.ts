import { Controller, Body, Post, Req, Res } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';
const jwt = require('jsonwebtoken');
require('dotenv').config();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() data: UserDto) {
    return await this.userService.userRegister(data);
  }
  @Post('signin')
  async signIn(@Req() req) {
    try {
      const { user } = await this.userService.loginUser(req.query);
      if (!user) {
        console.log('User Not here');
      } else {
        // user['accessToken'] = jwt.sign(
        //   { user: user.id, role: user.role },
        //   process.env.ACCESS_TOKEN_SECRET,
        // );
        return user;
      }
    } catch (error) {
      console.log('login controller error', error);
    }
  }
}
