import { Module } from '@nestjs/common';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';

@Module({
  imports: [],
  controllers: [FileProcessingController],
  providers: [FileProcessingService],
})
export class FileProcessingModule {}
