import { CreateStudentParams, UpdateStudentParams } from './../types/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../entity/student';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  getStudents() {
    return this.studentRepository.find();
  }
  createStudent(studentDetails: CreateStudentParams) {
    return this.studentRepository.save(studentDetails);
  }
  updateStudent(studentdetails: UpdateStudentParams) {
    return this.studentRepository.save(studentdetails);
  }
  deleteStudent(id: number) {
    return this.studentRepository.delete(id);
  }
}
