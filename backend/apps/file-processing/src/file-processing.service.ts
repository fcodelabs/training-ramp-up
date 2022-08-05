import { Injectable } from '@nestjs/common';

@Injectable()
export class FileProcessingService {
  getHello(): string {
    return 'File processing';
  }
}
