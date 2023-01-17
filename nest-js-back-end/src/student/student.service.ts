import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from 'src/dto/student.dto';
import { StudentModel } from './student.interface';
import { Student } from 'src/entities/studentEntity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<StudentModel>
  ) {}

  async getAllStudentService() {
    try {
      const allStudents = await this.studentRepository.find({
        order: { id: 'DESC' },
      });
      return allStudents;
    } catch (err) {
      console.log(err);
    }
  }

  async createStudentService(newStudent: StudentDto) {
    try {
      const student = await this.studentRepository.save(newStudent);
      return student;
    } catch (err) {
      console.log(err);
      return { error: 'Faild to add student !' };
    }
  }

  async updateStudentService(studentData: StudentDto) {
    try {
      const student = await this.studentRepository.findOneBy({
        id: studentData.id,
      });
      if (student) {
        this.studentRepository.merge(student, studentData);
        const result = await this.studentRepository.save(student);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteStudentService(studentId: number) {
    try {
      const result = await this.studentRepository.delete(studentId);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
