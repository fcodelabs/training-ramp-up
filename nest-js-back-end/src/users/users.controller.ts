import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    //return this.usersService.create(createUserDto);
    const response = await this.usersService.create(createUserDto);
    if (response) {
      const dataStoredInToken = {
        email: response.email,
        userRoll: response.userRoll,
      };
      const newAccessToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secret_key,
        { expiresIn: 60 * 60 }
      );
      const newRefreshToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secretRe_key,
        { expiresIn: 60 * 60 * 24 * 1000 }
      );
      res.cookie('accessToken', newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      return true;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/login')
  async findOne(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    const response = await this.usersService.findOne(body);
    if (response) {
      const dataStoredInToken = {
        email: response.email,
        userRoll: response.userRoll,
      };
      const newAccessToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secret_key,
        { expiresIn: 60 * 60 }
      );
      const newRefreshToken = jwt.sign(
        dataStoredInToken,
        config.jwt_secretRe_key,
        { expiresIn: 60 * 60 * 24 * 1000 }
      );
      res.cookie('accessToken', newAccessToken, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      return true;
    }
  }

  @Get('/userDetail')
  async findUserDetails(
    @Req() body: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    const userAccToken = body.cookies.accessToken;
    const response = await this.usersService.getUserDetails(userAccToken);
    const userData = {
      email: response.email,
      name: response.name,
      userRoll: response.userRoll,
    };
    res.cookie('userData', userData, {
      maxAge: 60 * 60 * 24 * 1000,
    });
    return true;
  }

  @Post('/refresh')
  async refresh(
    @Body() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    console.log('refresh working...1');
    const secret = config.jwt_secret_key;
    const refToken = req.cookies.refreshToken;
    const userToken: any = await this.usersService.refreshService(refToken);
    const dataStoredInToken = {
      email: userToken.email,
      userRoll: userToken.userRoll,
    };

    const newAccessToken = jwt.sign(dataStoredInToken, secret, {
      expiresIn: 60 * 60,
    });

    res.cookie('accessToken', newAccessToken, {
      maxAge: 60 * 60,
      httpOnly: true,
    });
    return true;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.cookie('accessToken', '', {
        maxAge: -1,
        httpOnly: true,
      });
      res.cookie('refreshToken', '', {
        maxAge: -1,
        httpOnly: true,
      });
      res.cookie('userData', '', {
        maxAge: -1,
        httpOnly: true,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
