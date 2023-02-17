import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signIn(user: AuthDto): Promise<UserEntity> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!findUser) {
        throw new HttpException('User does not exist', 400);
      }
      const valid = await bcrypt.compare(user.password, findUser.password);
      if (!valid) {
        throw new HttpException('Invalid Password', 400);
      }
      delete findUser.password;
      return findUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
