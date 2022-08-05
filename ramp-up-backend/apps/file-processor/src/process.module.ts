import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploaderModule } from 'apps/file-uploader/src/file-uploader.module';
import { Student } from 'apps/student-records/src/Student/entities/student.entity';
import { uploadProcessor } from './file-processor.consumer';
import { FileProcessorService } from './file-processor.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    FileUploaderModule
    
  ],
  providers: [FileProcessorService, uploadProcessor],
  controllers: [],
})
export class ProcessModule {}
