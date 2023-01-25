import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './auth/roles.guard';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [Student, User],
    }),
    StudentsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],

  //   imports: [
  //     ConfigModule.forRoot({
  //       isGlobal: true,
  //     }),
  //     TypeOrmModule.forRootAsync({
  //       imports: [ConfigModule],
  //       useFactory: (configService: ConfigService) => ({
  //         type: 'postgres',
  //         host: process.env.DB_HOST,
  //         port: +configService.get<number>('DB_PORT'),
  //         username: configService.get('DB_USERNAME'),
  //         password: configService.get('DB_PASSWORD'),
  //         database: configService.get('DB_NAME'),
  //         entities: [Student, User],
  //         synchronize: true,
  //         logging: true,
  //       }),
  //       inject: [ConfigService],
  //     }),
  //     StudentsModule,
  //     UsersModule,
  //     AuthModule,
  //   ],
  //   controllers: [AppController],
  //   providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
