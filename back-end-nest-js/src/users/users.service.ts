/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/users.entity';
import { Repository } from 'typeorm';
import { LoginUserInterface, UserInterface } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
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
      return null
    } catch (err) {
      throw err    
    }
  }

  async addUserService(newUser: UserInterface) {
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
      throw err    
    }
  }
}
