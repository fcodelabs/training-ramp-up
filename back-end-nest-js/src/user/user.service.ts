/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserInterface, UserInterface } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  checkUserValid = async (userEmail: string) => {
    const founduser = await this.userRepository.findOneBy({
      email: userEmail
    })
    if (founduser === null) {
      return true
    }
    return false
  }

  async getUserService(loginUser: LoginUserInterface) {
    try {
      const useremail = loginUser.email
      const founduser: UserInterface | null = await this.userRepository.findOneBy({
        email: useremail
      })
  
      if (founduser !== null) {
        const pwValid = await bcrypt.compare(loginUser.password, founduser.password)
        if (pwValid) return founduser
      }
      console.log(new UnauthorizedException());
      return null
    } catch (err) {
      return err
    }
  }

  async addStudentService(newUser: UserInterface) {
    try {
      if (await this.checkUserValid(newUser.email)) {
        const salt = await bcrypt.genSalt(10)
        const hashpw = await bcrypt.hash(newUser.password, salt)
        const user = new User()
        user.userName = newUser.userName
        user.email = newUser.email
        user.password = hashpw
        user.role = newUser.role
        const result = await this.userRepository.save(user)
        return result
      } else {
        return false
      }
    } catch (err) {
      return err
    }
  }

  // async updateStudentService(updateStudent: UpdateStudentInterface) {
  //   try {
  //     const studentId = updateStudent.id
  //     const student = await this.studentRepository.findOneBy({
  //       id: studentId
  //     })
  //     if (student !== null) {
  //       const updatedStudent = this.studentRepository.merge(student, updateStudent)
  //       const result = await this.studentRepository.save(updatedStudent)
  //       return result
  //     }
  //     return null
  //   } catch (err) {
  //     return null
  //   }  
  // }

  // async deleteStudentService(studentId: number) {
  //   try {
  //     const result = await this.studentRepository.delete(studentId)
  //     return result
  //   } catch (err) {
  //     return null
  //   }  
  // }
}
