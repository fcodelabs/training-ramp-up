import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ok } from 'assert';
import { Users } from 'src/entity/user.interface';
import { UserService } from './user.service';

interface logingDto {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign')
  async create(@Body() User: Users) {
    console.log('nest User', User);
    return await this.userService.createUser(User);
  }
  @Get()
  async logUser(@Req() req: any) {
    try {
      const user = await this.userService.logUser(req.query);
      if (!user) return 'User not found';
      return user;
    } catch (error) {
      console.log('SignUp Error', error);
    }
  }
}
