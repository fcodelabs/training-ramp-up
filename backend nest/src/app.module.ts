import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database.provider/config/database.config';
import { StudentModule } from './students/student.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    ConfigModule.forRoot(),
    StudentModule,
    AuthModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
