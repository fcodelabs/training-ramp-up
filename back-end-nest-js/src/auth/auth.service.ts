/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, UserInterface } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getTokens(user: UserInterface) {
    try {
      return {
        accessToken: this.jwtService.sign({user}, {expiresIn: '2m'}),
        refreshToken: this.jwtService.sign({user}, {expiresIn: '20m'})
      }
    } catch (error) {
      throw error
    }
  }

  async verifyRefresh(email: string, refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken) as JwtPayload
      return decoded.user.email === email
    } catch (error) {
      throw error
    }
  }

  async getAccessToken(user: UserInterface) {
    try {
      return this.jwtService.sign({user}, {expiresIn: '2m'})
    } catch (error) {
      throw error
    }
  }
}
