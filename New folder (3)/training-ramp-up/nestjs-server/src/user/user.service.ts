import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async userRegister(details: UserDto) {
    try {
      const checkUser = await this.userRepository.findOneBy({
        email: details.email,
      });
      if (checkUser == null) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(details.password, salt);
        const { name, email } = details;
        const user = await this.userRepository.save({
          name: name,
          email: email,
          password: hash,
          role: 'User',
        });
        return user;
      } else {
        return { error: 'user was here' };
      }
    } catch (error) {
      console.log('Register Error', error);
    }
  }

  async loginUser(details: any) {
    try {
      const user = await this.userRepository.findOneBy({
        email: details.email,
      });
      if (!user) {
        console.log('User not found');
      } else {
        const value = bcrypt.compare(details.password, user.password);
        if (!value) {
          console.log('Password not match');
        } else {
          user['accessToken'] = await jwt.sign(
            { user: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
          );
          return { user };
        }
      }
    } catch (error) {
      return { error: 'login service Error' };
    }
  }
}
