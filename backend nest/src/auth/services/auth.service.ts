import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
import { LoginUserDto } from '../dtos/loginUser.dto';
//import { CreateUserParams } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUpUser(userDetails: LoginUserDto) {
    try {
      return await this.userRepository.save(userDetails);
    } catch (err) {
      throw new BadRequestException('user already exits');
    }
  }
  async getUserByEmail(Email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ Email });
    } catch (err) {
      throw new NotFoundException('Invalid credentials');
    }
  }
}
