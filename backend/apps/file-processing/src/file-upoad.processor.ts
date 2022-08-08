import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Job } from "bull";
import * as csv from 'csvtojson';
import { Student } from "./entities/student.entity";



@Processor('upload-queue')
export class UploadProcessor {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    @Process('csv')
    async handleCsvFiles(job: Job) {
        const csvFilePath = process.cwd() + "\\uploads\\" + job.data.fileName;
        const jsonArray = await csv().fromFile(csvFilePath);

        for (let i = 0; i < jsonArray.length; i++) {
            let student: Student = {
                id: jsonArray[i].id,
                name: jsonArray[i].name,
                gender: jsonArray[i].gender,
                address: jsonArray[i].address,
                mobileNo: jsonArray[i].mobileNo,
                dateOfBirth: jsonArray[i].dateOfBirth,
                inEdit: jsonArray[i].inEdit,
                age: jsonArray[i].age,
                isArchive: jsonArray[i].isArchive
            };
            this.studentRepository.create(student);
            await this.studentRepository.save(student);
        }
    }


}

