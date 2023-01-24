import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Payload, Role } from 'src/auth/interfaces';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  @Roles([Role.Admin, Role.User])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Post()
  @Roles([Role.Admin,Role.User])
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.usersService.validateUser(
      req.body.username,
      req.body.password,
    );
    const result = await this.authService.login(user);
    res.cookie('accessToken', result.accessToken, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    res.send({ auth: true });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Roles([Role.Admin, Role.User])
  @Post('userDetails')
  async getUserDetails(@Req() req: Request, @Res() res: Response) {
    const userToken = await this.authService.getUserDetails(
      req.cookies.accessToken,
    );
    res.cookie('user', userToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: false,
    });

    res.send('OK')
  }

  @Post('refresh')
  @Roles([Role.Admin,Role.User])
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const user:string = req.cookies.user;
    const refreshToken:string = req.cookies.refreshToken;
    const result = await this.authService.getNewAccessToken(user, refreshToken);
    res.cookie('accessToken', result.accessToken, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });

    res.send('OK')
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Roles([Role.Admin,Role.User])
  async signout(@Req() req: Request, @Res() res: Response) {
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('refreshToken', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie('user', '', {
      maxAge: 0,
      httpOnly: false,
    });
    res.status(200).send({
      logOut: true,
    });
  }
}
