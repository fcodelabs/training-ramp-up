import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) { }

  //job of retrieving a user and verifying the password.
  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    const userArray = await this.userService.findOne(userEmail);
    const { password, ...result } = userArray[0];
    ;
    if (userArray && bcrypt.compareSync(userPassword, password)) {
      return result; // return { id, email }
    }
    return null;
  }

  async signup(user: any) {
    const userExists = await this.userService.findOne(user.email);

    if (userExists.length !== 0) {
      throw new BadRequestException('User already exists');
    }

    const userObj = {
      email: user.email,
      password: user.password,
    }
    const newUser = await this.userService.create(userObj);
    const tokens = await this.getTokens(newUser.id, user.email);

    const newUserObj = {
      ...newUser,
      hashedRefreshToken: tokens.refresh_token,
    }

    await this.userService.update(newUser.id, newUserObj);
    return tokens;
  }

  async getTokens(id: string, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync({
        sub: id,
        email
      },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: "15m"
        }
      ),

      this.jwtService.signAsync({
        sub: id,
        email
      },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },

      )
    ]);

    return {
      access_token,
      refresh_token
    }
  }
}
