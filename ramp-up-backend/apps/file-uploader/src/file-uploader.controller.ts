import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class FileUploaderController {
  constructor(@InjectQueue('file-queue') private fileQueue: Queue) {}
 

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', 
  {
    storage: diskStorage({
      destination:'./uploads',
      filename: (req,file, callback)=>{
        const suffix = Date.now() + '-' + Math.round(Math.random());
        const ext = extname(file.originalname)
        const fileName = `${suffix}${ext}`;
        callback(null, fileName)
      }
    })
  }
  ))
  //handling the file upload by adding the file to job queue
  async handleFileUpload(@UploadedFile() file:Express.Multer.File){
    this.fileQueue.add('csv', {file})
  }
}

