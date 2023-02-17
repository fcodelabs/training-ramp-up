import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshStrategy } from 'src/utils/guards/strategy/refresh.strategy';
import { JwtStrategy } from 'src/utils/guards/strategy/jwt.strategy';
import { UserService } from '../users/service/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy, UserService],
})
export class AuthModule {}
