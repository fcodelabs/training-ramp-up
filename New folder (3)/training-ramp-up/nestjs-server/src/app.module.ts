import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
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
      password: '2015',
      database: 'rampup_nestjs',
      synchronize: true,
      logging: false,
      entities: [Student, User],
      migrations: [],
      subscribers: [],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
