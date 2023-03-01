import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.signUp(createUserDto);
    return res.status(201).json({
      message: 'User created successfully',
      user: user,
    });
  }
}
