import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
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

  async signUp(user: any) {
    //check if user exists
    const userExists = await this.userService.findOne(user.email);

    if (userExists.length !== 0) throw new BadRequestException('User already exists');

    const newUser = await this.userService.create(user.email, user.password);
    const tokens = await this.getTokens(newUser.id, user.email);
    await this.userService.update(newUser, tokens.refresh_token);
    return tokens;
  }

  async signIn(user: any) {
    //check if user exists
    const userExists = await this.userService.findOne(user.email);

    if (userExists.length === 0) throw new BadRequestException('User does not exists');

    const passwordMatches = bcrypt.compareSync(user.password, userExists[0].password);

    if (!passwordMatches) throw new BadRequestException("Password is incorrect");

    const tokens = await this.getTokens(user.id, user.email);
    await this.userService.update(userExists[0], tokens.refresh_token);
    return tokens;
  }

  async logOut(email: any) {
    const user = await this.userService.findOne(email);
    await this.userService.update(user[0], "")
  }

  async refreshToken(email: string, refreshToken: string) {
    const user = await this.userService.findOne(email);

    if (user.length === 0 && !user[0].hashedRefreshToken) throw new ForbiddenException('Access Denied');

    if (refreshToken !== user[0].hashedRefreshToken) throw new ForbiddenException('Access Token Mismatched');

    const tokens = await this.getTokens(user[0].id, user[0].email);
    await this.userService.update(user[0], tokens.refresh_token);
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
