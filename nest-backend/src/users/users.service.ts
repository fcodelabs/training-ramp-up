import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (findUser) {
        throw new HttpException('User already exists', 400);
      }

      const newPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = newPassword;
      const newUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(newUser);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
