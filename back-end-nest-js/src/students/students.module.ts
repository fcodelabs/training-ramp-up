import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Student from 'src/students/entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
