import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentsController } from './controllers/students.controller';
import { StudentModule } from './student/student.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [StudentModule, StudentsModule],
  controllers: [StudentsController],
  providers: [StudentService],
})
export class AppModule {}
