import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentAddDto, StudentUpdateDto } from '../dto/student.dto';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { StudentInterface } from './student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<StudentInterface>,
  ) {}

  async createStudentService(newStudent: StudentAddDto) {
    try {
      const student = await this.studentRepository.save(newStudent);
      return student;
    } catch (err) {
      return { err: 'Student adding Failed' };
    }
  }

  async getAllStudentService() {
    try {
      const allStudents = await this.studentRepository.find();
      return allStudents;
    } catch (err) {
      return { err: 'Students are not Found' };
    }
  }

  async updateStudentService(studentData: StudentUpdateDto, studentId: number) {
    try {
      const student = await this.studentRepository.findOneBy({ id: studentId });
      console.log('id ', student);
      this.studentRepository.merge(student, studentData);
      const result = await this.studentRepository.save(student);
      return result;
    } catch (err) {
      return { err: 'Cannot Update Student' };
    }
  }

  async deleteStudentService(studentId: number) {
    try {
      const result = await this.studentRepository.delete(studentId);
      return result;
    } catch (err) {
      return { err: 'Error with Deleting Student' };
    }
  }
}
