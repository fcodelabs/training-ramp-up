import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from '../dto/student.dto';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudent(): Promise<StudentEntity[]> {
    try {
      return await this.studentRepository.find({
        order: {
          id: 'ASC',
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async addStudent(student: StudentDto): Promise<StudentEntity> {
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateStudent(id: number, student: StudentDto): Promise<StudentEntity> {
    try {
      const response = await this.studentRepository.update(id, student);
      return { ...student, ...response };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteStudent(id: number): Promise<string> {
    try {
      const student = await this.studentRepository.findOne({
        where: { id },
      });
      const studentName = student.name;
      await this.studentRepository.delete(id);
      return studentName;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
