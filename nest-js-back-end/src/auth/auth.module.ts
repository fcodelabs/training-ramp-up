import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
@Module({
  imports: [
    JwtModule.register({
      secret: config.jwt_secret_key,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
