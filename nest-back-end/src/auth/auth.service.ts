import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async signUp(signUpUser: User) {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: signUpUser.email,
      });
      // this.logger.log(existingUser.email);
      this.logger.log(signUpUser.password);
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(signUpUser.password, 10);
        signUpUser.password = hashedPassword;
        return await this.userRepository.manager.save(signUpUser);
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
