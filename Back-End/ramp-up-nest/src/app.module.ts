import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './entities/student.entity';
import * as dotenv from 'dotenv';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { VerifyLogout } from './middleware/loggedUser.middleware';

dotenv.config();

@Module({
  imports: [
    StudentModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Student, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(logoutConsumer: MiddlewareConsumer) {
    logoutConsumer
      .apply(VerifyLogout)
      .forRoutes({ path: 'user/logout', method: RequestMethod.GET });
  }
}
