import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async logint(loginDto: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new HttpException('User not found', 200);
      }
      const checkPass = await bcrypt.compare(loginDto.password, user.password);
      if (!checkPass) {
        console.log('Invalid credentials');
        // throw new HttpException('Invalid credentials', 200);
      }
      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, error.status);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const foundUser = await this.validateUser(user.email, user.password);
    const payload = { email: foundUser.email, userRole: foundUser.userRole };

    const tokens = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '20s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    const access_token = tokens[0];
    const refresh_token = tokens[1];

    return {
      access_token: access_token,
      refresh_token: refresh_token,
      email: user.email,
      userRole: foundUser.userRole,
    };
  }

  async refreshToken(cookie) {
    try {
      const refresh_token = cookie.jwt;
      if (!refresh_token) {
        throw new HttpException('No token provided', 400);
      }
      const decoded = this.jwtService.decode(refresh_token);
      console.log(decoded);
      const accessToken = await this.jwtService.signAsync(
        { payload: decoded },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '20s',
        },
      );

      return accessToken;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
