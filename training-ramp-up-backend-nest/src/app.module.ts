import { Module } from '@nestjs/common';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'studentdetailsnest',
      entities: [Student],
      synchronize: true,
    }),
    StudentsModule,
  ],
})
export class AppModule {}
