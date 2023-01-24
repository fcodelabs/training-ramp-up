import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'signintoken',
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
