import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/userEntity';
import { Student } from './entities/studentEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
import { StudentModule } from './student/student.module';
@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lp1999#',
      database: 'Student',
      synchronize: true,
      logging: true,
      entities: [Student, User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
