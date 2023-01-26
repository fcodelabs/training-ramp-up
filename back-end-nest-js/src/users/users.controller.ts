/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('signin')
  async signinUser(@Body() loginUser: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    try {  
      const user: any = await this.userService.getUserService(loginUser)
        if (user) {
          const tokens = await this.authService.getTokens(user)
          res.cookie('accessToken', tokens['accessToken'], { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
          res.cookie('refreshToken', tokens['refreshToken'], { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
          res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false })
          return res.status(200).send(user)
        }
        return res.status(401).send('Email or Password Invalid')
    } catch (err) {
      throw err
    }
  }

  @Post('signup')
  async signupUser(@Body() newStudent: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.userService.addUserService(newStudent)
      if (result !== false) {
        return res.status(201).send(result)
      } else {
        return res.status(401).send('Email was already used')
      }
    } catch (err) {
      throw err
    }
  } 

  @Post('signout')
  async signoutUser(@Res({ passthrough: true }) res: Response) {
    res.cookie('accessToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('refreshToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('user', '', { maxAge: -1, httpOnly: false })
    return res.status(200).send('User Logged out')
  }

  @Post('refresh')
  async refreshUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const user = req.cookies['user']
      const refreshToken = req.cookies['refreshToken']
      if(user !== null && refreshToken !== null) {
        const isValid: boolean = await this.authService.verifyRefresh(user.email, refreshToken)
        if (!isValid) return res.status(401).send('Invalid refresh Token')

        const accessToken = await this.authService.getAccessToken(user)
        res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        return res.status(200).send('Access Token returned')
      } else {
        return res.status(401).send('Unauthorized Access')
      }
    } catch (err) {
      throw err
    }
  }
}
