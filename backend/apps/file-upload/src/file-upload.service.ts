import { InjectQueue } from '@nestjs/bull';
import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileUploadService {

  constructor(@InjectQueue('upload-queue') private fileQueue: Queue) { }

  uploadFile(file: Express.Multer.File) {
    this.fileQueue.add('csv', { fileName: file.filename });
    return file.filename;
  }
}
