import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Users } from 'src/entity/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign')
  async create(@Body() User: Users) {
    return await this.userService.createUser(User);
  }
  @Post('loging')
  async logUser(@Body() User: Users) {
    try {
      const user = await this.userService.logUser(User);
      if (!user) return 'User not found';
      return user;
    } catch (error) {
      console.log('SignUp Error', error);
    }
  }
}
