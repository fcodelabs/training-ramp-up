import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
//import { CreateUserParams } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  signUpUser(userDetails: any) {
    try {
      return this.userRepository.save(userDetails);
    } catch (err) {
      if (err.code === '23505')
        throw new ForbiddenException('user already exits');
    }
  }
  getUserByEmail(Email: string): Promise<User> {
    try {
      return this.userRepository.findOneBy({ Email });
    } catch (err) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
