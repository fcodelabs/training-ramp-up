import { InjectQueue } from '@nestjs/bull';
import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'apps/student-records/src/Student/entities/student.entity';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

@Injectable()
export class FileProcessorService {
  constructor(@InjectRepository(Student) private studentRepo:Repository<Student>){}

  async saveFile(file:any): Promise<Student>{
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + file.path;
    const studentDataList = await csv().fromFile(csvFilePath);
    console.log(studentDataList);

    var students;
    try {
      students = await this.studentRepo.save(studentDataList)
    } catch (error) {
      students =null;
    }
    return students
  }
}
