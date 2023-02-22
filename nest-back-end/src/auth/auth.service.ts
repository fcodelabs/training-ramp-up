import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
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
        return await this.userRepository.save(signUpUser);
      } else {
        return null;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
    const payload = { email: user.email, sub: user.id };
    const tokens = await this.getTokens(user.id, user.email);
    return {
      // access_token: this.jwtService.sign(payload),
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      role: user.role,
    };
  }

  async getTokens(id: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
          email: email,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '60s',
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
          email: email,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '1d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    const decodedJwtAccessToken = this.jwtService.decode(refreshToken);
    const id = decodedJwtAccessToken['id'];
    const email = decodedJwtAccessToken['email'];
    const accessToken = await this.jwtService.signAsync(
      {
        id: id,
        email: email,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15s',
      },
    );
    return accessToken;
  }
}
