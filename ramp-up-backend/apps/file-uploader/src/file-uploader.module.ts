import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'file-queue',
    }),
  ],

  controllers: [FileUploaderController],
  providers: [FileUploaderService],
})
export class FileUploaderModule {}
