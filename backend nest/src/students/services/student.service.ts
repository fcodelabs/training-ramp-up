/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateStudentDto } from './../dtos/updateStudent.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../entity/student';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../dtos/createStudent.dto';

@Injectable()
export class StudentService {
  //private readonly logger = new Logger(StudentService.name);
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  getStudents(): Promise<Student[]> {
    //this.logger.log('Getting all students');
    //this.logger.error('Getting all students');
    return this.studentRepository.find();
  }
  createStudent(studentDetails: CreateStudentDto) {
    return this.studentRepository.save(studentDetails);
  }
  updateStudent(studentdetails: UpdateStudentDto) {
    return this.studentRepository.save(studentdetails);
  }
  deleteStudent(id: number) {
    return this.studentRepository.delete(id);
  }
}
