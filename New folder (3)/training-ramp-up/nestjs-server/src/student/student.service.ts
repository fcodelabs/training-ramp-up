/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from 'src/dto/student.dto';
import { StudentRepository } from './student.repository';
import { Repository } from 'typeorm';
import { Student } from 'src/entity/student.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getAll() {
    try {
      const student = await this.studentRepository.find();
      return student;
    } catch (error) {
      console.log(error);
    }
  }

  async addOne(student: StudentDto) {
    try {
      const studentData = await this.studentRepository.save(student);

      return studentData;
    } catch (error) {
      console.log(error);
    }
  }

  async updateOne(data) {
    try {
      const student = await this.studentRepository.findOne({
        where: { id: parseInt(data.id) },
      });

      this.studentRepository.merge(student, data);
      const result = await this.studentRepository.save(student);
      if (!result) {
        return {
          error: 'student update fail',
        };
      }

      return result;
    } catch (error) {
      console.log(error);
      return { error: 'student update fail' };
    }
  }
  async deleteOne(id: number) {
    try {
      const student = await this.studentRepository.findOneBy({ id });

      if (student) {
        await this.studentRepository.remove(student);
      }
      return student;
    } catch (error) {
      console.log(error);
    }
  }
}
