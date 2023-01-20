import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    StudentsModule,
    UsersModule,
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
    StudentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
