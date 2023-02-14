import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { StudentService } from './services/student.service';
import { Student } from 'src/entity/student';
import { AccessTokenGuard } from 'src/guards/authGuard/accessToken.guard';
import { RolesGuard } from 'src/guards/roleGuard/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/guards/strategies/accesstoken.strategy';
import { gateWay } from 'src/web-socket/gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), JwtModule.register({})],
  controllers: [StudentController],
  providers: [
    StudentService,
    AccessTokenStrategy,
    RolesGuard,
    AccessTokenGuard,
    gateWay,
  ],
})
export class StudentModule {}
