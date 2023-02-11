import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../models/student.entity';
import { StudentDto } from '../dto/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudent() {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async addStudent(student: StudentDto) {
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateStudent(id: number, student: StudentDto) {
    try {
      const response = await this.studentRepository.update(id, student);
      return { ...student, ...response };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteStudent(id: number) {
    try {
      const student = this.studentRepository.findOne({
        where: { id },
      });
      await this.studentRepository.delete(id);
      return student;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
