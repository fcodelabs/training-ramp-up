import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadProcessor } from 'apps/file-processing/src/file-upoad.processor';
import { Student } from 'apps/student/src/entities/student.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [MulterModule.register({ dest: './uploads' }),

  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379
    },
  }),
  BullModule.registerQueue({
    name: 'upload-queue'
  })],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule { }
