import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto, RegisterUserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async registerUser(@Body() newUser: RegisterUserDto, @Res() res: Response) {
    try {
      const { name, password, email } = newUser;

      const user = await this.userService.createUserService({
        name,
        email: email.toLowerCase(),
        password,
      });
      res.status(200);
      res.json(user);
      return;
    } catch (err) {
      res.status(400);
    }
  }

  @Post('/login')
  async loginUser(@Body() userData: LoginUserDto, @Res() res: Response) {
    try {
      const { email, password } = userData;

      const user = await this.userService.loginUserService({
        email: email.toLowerCase(),
        password,
      });
      res.status(200);
      res.json(user);
      return;
    } catch (err) {
      res.status(400);
    }
  }
}
