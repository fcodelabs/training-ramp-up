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
    // console.log('User was', data);
    // return await this.userService.userRegister(data);
    return await this.userService.userRegister(data);
    // console.log('User', user);
  }
  @Post('signin')
  async signIn(@Req() req) {
    // const userDetails = req.query;
    try {
      const { user } = await this.userService.loginUser(req.query);
      if (!user) {
        console.log('User Not here');
      } else {
        user['accessToken'] = jwt.sign(
          { user: user.id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
        );
        return user;
      }
      // if (!user) return res.json('Error User login').status(400);

      // return res.send({
      //   user: user.user,
      //   accessToken: jwt.sign(
      //     { user: user.id, role: user.user.role },
      //     process.env.ACCESS_TOKEN_SECRET,
      //   ),
      // });
      // return res.send({ user: user.user });
    } catch (error) {
      console.log('login controller error', error);
    }
  }
}
