import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'apps/student/src/entities/student.entity';
import { UploadProcessor } from './file-upoad.processor';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'student',
    entities: [Student],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Student]),
  BullModule.registerQueue({
    name: 'upload-queue'
  }),
  ],
  controllers: [],
  providers: [UploadProcessor],
})
export class FileProcessingModule { }
