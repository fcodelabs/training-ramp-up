import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { UserModule } from './user/user.module';
import { User } from './entity/user.entity';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123Da@',
      database: 'nest-api',
      entities: [Student, User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
