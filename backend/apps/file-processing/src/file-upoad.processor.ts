import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import * as csv from 'csvtojson';
import { Repository } from 'typeorm';
import { StudentCreateDto } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { FileSavedNotificationGateway } from './fileSavednotification.gatewaty';

@Processor('upload-queue')
export class UploadProcessor {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private notificationGateway: FileSavedNotificationGateway,
  ) {}

  @Process('csv')
  async handleCsvFiles(job: Job) {
    try {
      const csvFilePath = process.cwd() + '\\uploads\\' + job.data.fileName;
      const jsonArray = await csv().fromFile(csvFilePath);
      for (let i = 0; i < jsonArray.length; i++) {
        const student: StudentCreateDto = {
          name: jsonArray[i].name,
          gender: jsonArray[i].gender,
          address: jsonArray[i].address,
          mobileNo: jsonArray[i].mobileNo,
          dateOfBirth: new Date(jsonArray[i].dateOfBirth),
          inEdit: jsonArray[i].inEdit,
          age: jsonArray[i].age,
          isArchive: jsonArray[i].isArchive,
        };
        const newStudentObj: Student = this.studentRepository.create(student);
        const response = await this.studentRepository.save(newStudentObj);
        if (response) this.notificationGateway.handleMessage('file saved');
      }
    } catch (error) {
      // console.log(error);
    }
  }
}
