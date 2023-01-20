/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto/users.dto';
import { UserInterface } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}
  
  validate = (user: UserInterface) => {
    const nameReg = /^([A-z\s]{3,30})$/
    const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/
    const validPw: boolean = user.password.length >= 8 && /[0-9]/.test(user.password)
    const validConfirmPw: boolean = !validPw || user.password === user.confirmPassword
  
    if (!nameReg.test(user.userName)) {
      return false
    }
    if (!emailReg.test(user.email)) {
      return false
    }
    if (!validPw) {
      return false
    }
    if (!validConfirmPw) {
      return false
    }
    if (user.role === '') {
      return false
    }
    return true
  }

  @Post('signin')
  async signinUser(@Body() loginUser: LoginUserDto, @Res() res: Response) {
    try {  
      const user: any = await this.userService.getUserService(loginUser)
        if (user) {
          const tokens = await this.authService.getTokens(user)
          res.cookie('accessToken', tokens.accessToken, { maxAge: 1000 * 60 * 2, httpOnly: true })
          res.cookie('refreshToken', tokens.refreshToken, { maxAge: 1000 * 60 * 20, httpOnly: true })
          res.cookie('user', user, { maxAge: 1000 * 60 * 20, httpOnly: false })
          return res.status(200).send(user)
        }
        return res.status(401).send('Email or Password Invalid')
    } catch (err) {
      throw err
    }
  }

  @Post('signup')
  async signupUser(@Body() newStudent: CreateUserDto, @Res() res: Response) {
    const valid = this.validate(newStudent)
    if (valid) {
      const result = await this.userService.addUserService(newStudent)
      if (result !== false) {
        return res.status(201).send(result)
      } else {
        return res.status(400).send('Email was already used')
      }
    } else {
      return res.status(400).send('Can not add student. Enter Valid Data')
    }
  } 

  @Post('signout')
  async signoutUser(@Res() res: Response) {
    res.cookie('accessToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('refreshToken', '', { maxAge: -1, httpOnly: true })
    res.cookie('user', '', { maxAge: -1, httpOnly: false })
    return res.status(200).send('User Logged out')
  }

  @Post('refresh')
  async refreshUser(@Req() req: Request, @Res() res: Response) {
    try {  
      const user = await req.cookies.user ?? ''
      const refreshToken = await req.cookies.refreshToken ?? ''
      if(user !== null && refreshToken !== null) {
        const isValid = await this.authService.verifyRefresh(user.email, refreshToken)
        
        if (!isValid) return res.status(401).send('Invalid refresh Token')

        const accessToken = await this.authService.getAccessToken(user)
        return res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 2, httpOnly: true }).status(200)
          .send('Access Token returned')
      } else {
        return res.status(401).send('Unauthorized Access')
      }
    } catch (err) {
      throw err
    }
  }
}
