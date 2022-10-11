import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
const jwt = require('jsonwebtoken');
require('dotenv').config();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() data: UserDto) {
    // console.log('User was', data);
    // return await this.userService.userRegister(data);
    const user = await this.userService.userRegister(data);
    console.log('User', user);
  }
  @Post('signin')
  async signIn(@Req() req, @Res() res) {
    // console.log('Details', req.query);
    const userDetails = req.query;
    try {
      const user = await this.userService.loginUser(userDetails);
      console.log('Login User', user.user);
      if (!user) return res.json('Error User login').status(400);
      return res.send({
        user: user.user,
        accessToken: jwt.sign(
          { user: user.id, role: user.user.role },
          process.env.ACCESS_TOKEN_SECRET,
        ),
        refreshToken: jwt.sign(user.id, process.env.RE_TOKEN_KEY),
      });
      // return res.send({ user: user.user });
    } catch (error) {
      console.log('login controller error', error);
    }
  }
}
