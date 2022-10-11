import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { Student } from './entity/student.entity';
import { VerifyTokenMiddleware } from './middleware/verifyToken.middleware';
import { StudentsController } from './students/students.controller';
import { User } from './entity/user.entity';

@Module({
  imports: [
    StudentsModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6000,
      username: new ConfigService().get<string>('DATABASE_USERNAME'),
      password: new ConfigService().get<string>('DATABASE_PASSWORD'),
      database: new ConfigService().get<string>('DATABASE_NAME'),
      entities: [Student, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes(StudentsController);
  }
}
