import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
