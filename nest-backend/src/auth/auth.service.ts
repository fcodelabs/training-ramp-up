import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new HttpException('User not found', 400);
      }
      const checkPass = await bcrypt.compare(loginDto.password, user.password);
      if (!checkPass) {
        throw new HttpException('Invalid credentials', 400);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
