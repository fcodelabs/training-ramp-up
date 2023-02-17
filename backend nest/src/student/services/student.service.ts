/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateStudentDto } from './../dtos/updateStudent.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entity/student';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentDto } from '../dtos/createStudent.dto';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class StudentService {
  //private readonly logger = new Logger(StudentService.name);
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async getStudents(): Promise<Student[]> {
    //this.logger.log('Getting all students');
    //this.logger.error('Getting all students');
    try {
      return await this.studentRepository.find({ order: { personID: 'ASC' } });
    } catch (err) {
      throw new NotFoundException('failed to get students');
    }
  }
  async createStudent(studentDetails: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentDetails);
    } catch (err) {
      throw new BadRequestException('failed to create student');
    }
  }
  async updateStudent(studentdetails: UpdateStudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentdetails);
    } catch (err) {
      throw new BadRequestException('failed to update student');
    }
  }
  async deleteStudent(id: number): Promise<DeleteResult> {
    try {
      return await this.studentRepository.delete(id);
    } catch (err) {
      throw new BadRequestException('failed to delete student');
    }
  }
}
