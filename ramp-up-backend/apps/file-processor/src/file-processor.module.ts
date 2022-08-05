import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'apps/student-records/src/Student/entities/student.entity';
import { ProcessModule } from './process.module';

@Module({
  imports: [
    ProcessModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'user',
      database: 'Students',
      entities: [Student],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class FileProcessorModule {}
