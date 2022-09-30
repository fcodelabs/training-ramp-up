import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Session, Student } from './entities';

@Module({
  imports: [
    AuthModule,
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgress',
      database: 'postgres',
      entities: [User, Session, Student],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
