import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadService } from './file-upload.service';

@Controller()
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) { }


  // single file
  @Post('file')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const name = file.originalname.toLowerCase().substring(0, file.originalname.indexOf('.')).split(' ').join('-');
          const ext = extname(file.originalname);
          const fileName = `${name}-${Date.now()}${ext}`;
          callback(null, fileName);
        }
      })
    }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileUploadService.uploadFile(file)
    return file.filename;
  }

}
