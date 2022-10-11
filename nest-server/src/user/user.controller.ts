import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Users } from 'src/entity/user.interface';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign')
  async create(@Body() User: Users) {
    return await this.userService.createUser(User);
  }
  @Get()
  async logUser(@Req() req: any) {
    try {
      const user = await this.userService.logUser(req.query);

      if (!user) return 'User not found';
      const tokenwithUser = {
        user: user,
        accessToken: jwt.sign({ id: user.id, role: user.role }, 'udwd4545'),
      };
      console.log('User tooken', tokenwithUser);
      return tokenwithUser;
    } catch (error) {
      console.log('SignUp Error', error);
    }
  }
}
