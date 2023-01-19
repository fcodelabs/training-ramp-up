import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from 'src/app.gateway';
import { AuthModule } from 'src/auth/auth.module';
import Student from 'src/students/entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), AuthModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
