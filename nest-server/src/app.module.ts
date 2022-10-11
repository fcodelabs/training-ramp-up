import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { UserModule } from './user/user.module';
import { User } from './entity/user.entity';
import { StudentController } from './student/student.controller';
import AdminMiddleware from './middleware/admin.middleware';

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
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude({ path: 'student', method: RequestMethod.GET }, 'student/(.*)')
      .forRoutes(StudentController);
  }
}
