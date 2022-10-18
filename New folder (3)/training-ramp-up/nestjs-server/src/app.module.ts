import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { Student } from './entity/student.entity';
import { UserModule } from './user/user.module';
import { User } from './entity/user.entity';
import AdminMiddleware from './middleware/admin.middleware';
import { StudentController } from './student/student.controller';
require('dotenv').config();

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_USERNAME,
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
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      // .exclude({ path: 'student', method: RequestMethod.POST })
      .forRoutes(StudentController);
  }
}
