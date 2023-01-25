import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import bcrypt = require('bcrypt');
import { Logger } from '@nestjs/common/services';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<InsertResult> {
    try {
      const password = await bcrypt.hash(createUserDto.password, 12);
      createUserDto.password = password;
      createUserDto.role = process.env.USER_ROLE;
      const result = this.userRepository.insert(createUserDto);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async isUserAlreadyExist(username: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
      if (user != null) {
        throw new BadRequestException('User already exists');
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async validateUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
          const { password, ...result } = user;
          return user;
        } else {
          throw new NotFoundException('Incorrect Password');
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (err) {
      throw err;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
