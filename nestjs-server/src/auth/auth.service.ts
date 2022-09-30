import { Injectable } from '@nestjs/common';
import { User, Session } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.authRepository.findOneBy({ email });
    if (!user) {
      return undefined;
    }
    // verify your user -- use argon2 for password hashing!!
    const pwMatches = await argon.verify(user.password, password);
    if (!pwMatches) {
      return undefined;
    }
    return this.newRefreshAndAccessToken(user);
  }

  private async newRefreshAndAccessToken(user: User) {
    const newSession = await this.sessionRepository.save({
      email: user.email,
      name: user.name,
      valid: true,
    });
    const tokenData = {
      userId: user.id,
      sessionId: newSession.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = sign(tokenData, process.env.ACCESS_SECRET, {
      expiresIn: '2m',
    });
    const refreshToken = sign(tokenData, process.env.REFRESH_SECRET, {
      expiresIn: '1y',
    });
    const userData = {
      sessionId: newSession.id,
      email: newSession.email,
      name: newSession.name,
      role: user.role,
    };
    return {
      refreshToken,
      accessToken,
      userData,
    };
  }

  async logout(sessionId: string) {
    try {
      const session = await this.sessionRepository.findOneBy({ id: sessionId });
      if (!session) {
        return { error: "Session doesn't exist!" };
      }
      const invalidSession = await this.sessionRepository.save({
        ...session,
        valid: false,
      });
      return { message: 'Successfully logged out!' };
    } catch (error) {
      return { error: 'Failed to log out!' };
    }
  }
  async refresh(refreshStr: string) {
    const payload = this.retrieveRefreshToken(refreshStr);
    if (!payload) {
      return undefined; //throw error
    }

    const user = await this.authRepository.findOneBy({ email: payload.email });
    if (!user) {
      return undefined;
    }
    const session = await this.sessionRepository.findOneBy({
      id: payload.sessionId,
    });
    if (!session) {
      return undefined;
    }
    const tokenData = {
      userId: user.id,
      sessionId: session.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = sign(tokenData, process.env.ACCESS_SECRET, {
      expiresIn: '30s',
    });
    const userData = {
      sessionId: session.id,
      email: session.email,
      name: session.name,
      role: user.role,
    };
    return { accessToken, userData };
  }

  private retrieveRefreshToken(refreshStr: string) {
    try {
      const payload = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof payload === 'string') {
        return undefined;
      }
      return payload;
    } catch (e) {
      return undefined;
    }
  }
}
