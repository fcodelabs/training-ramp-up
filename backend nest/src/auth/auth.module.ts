import { RolesGuard } from './../guards/roleGuard/roles.guard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user';
import { AuthController } from './constroller/auth.controller';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from 'src/guards/strategies/accesstoken.strategy';
import { RefreshTokenStrategy } from 'src/guards/strategies/refreshtoken.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RolesGuard,
  ],
})
export class AuthModule {}
