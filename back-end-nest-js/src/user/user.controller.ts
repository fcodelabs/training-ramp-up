/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UserService } from './user.service';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config()

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  refreshsecret = process.env.REFRESH_SECRET
  accesssecret = process.env.ACCESS_SECRET
  
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
      if (user !== null && user !== undefined) {
        const accessToken = jwt.sign({ user },
          this.accesssecret, { expiresIn: '2m' })
        const refreshToken = jwt.sign({ user },
          this.refreshsecret, { expiresIn: '20m' })
        res.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 2, httpOnly: true })
        res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 20, httpOnly: true })
        res.cookie('user', user, { maxAge: 1000 * 60 * 20, httpOnly: false })
        res.status(200).send(user)
        return
      }
  
      return res.status(401).send('Email or Password Invalid')
    } catch (err) {
      res.status(403).send(`Error: ${err}`)
    }
  }

  @Post('signup')
  async addStudent(@Body() newStudent: CreateUserDto, @Res() res: Response) {
    try {
      const valid = this.validate(newStudent)
      if (valid) {
        const result = await this.userService.addStudentService(newStudent)
        if (result !== null) {
          return res.status(201).send(result)
        } else {
          return res.status(400).send('Could not add student')
        }
      } else {
        return res.status(400).send('Can not add student. Enter Valid Data')
      }
    } catch (err) {
      return res.status(400).send(`Error: ${err}`)
    }  
  } 

  // @Post('signout')
  // async updateStudent(@Body() updateStudent: UpdateStudentDto, @Res() res: Response) {
  //   try {
  //     if (this.validate(updateStudent)) {
  //       const result = await this.studentService.updateStudentService(updateStudent)
  //       if (result !== null) {
  //         return res.status(200).send(result)
  //       } else {
  //         return res.status(400).send('Could not update student')
  //       }
  //     } else {
  //       return res.status(400).send('Can not update student. Enter Valid Data')
  //     }
  //   } catch (err) {
  //     return res.status(400).send(`Error: ${err}`)
  //   }
  // }

  // @Post('refresh')
  // async deleteStudent(@Param('Id') deleteStudentId: string, @Res() res: Response) {
  //   try {
  //     const studentId = parseInt(deleteStudentId)
      
  //     const result: DeleteResult = await this.studentService.deleteStudentService(studentId)
  //     if (result.affected !== 0) {
  //       return res.status(200).send(result)
  //     } else {
  //       return res.status(400).send('Could not found student to delete')
  //     }
  //   } catch (err) {
  //     return res.status(400).send(`Error: ${err}`)
  //   }  
  // }
}
