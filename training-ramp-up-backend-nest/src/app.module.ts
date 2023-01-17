import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [StudentService],
})
export class AppModule {}
