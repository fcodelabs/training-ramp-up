/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { StudentModule } from './students/student.module';
import { UserModule } from './users/user.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    StudentModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
