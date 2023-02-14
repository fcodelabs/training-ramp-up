import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user';
import { Repository } from 'typeorm';
//import { CreateUserParams } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  signUpUser(userDetails: any) {
    return this.userRepository.save(userDetails);
  }
  getUserByEmail(Email: string): Promise<User> {
    return this.userRepository.findOneBy({ Email });
  }
  logOutUser(userDetails: any) {
    return this.userRepository.find(userDetails);
  }
  refreshToken(userDetails: any) {
    return this.userRepository.find(userDetails);
  }
}
