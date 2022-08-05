import { Controller, Get } from '@nestjs/common';
import { FileProcessingService } from './file-processing.service';

@Controller()
export class FileProcessingController {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  @Get()
  getHello(): string {
    return this.fileProcessingService.getHello();
  }
}
