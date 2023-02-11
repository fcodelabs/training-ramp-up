import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './service/user.service';
import { JwtStrategy } from './guards/strategy/jwt.strategy';
import { RefreshStrategy } from './guards/strategy/refresh.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, RefreshStrategy],
})
export class UserModule {}
