import { Injectable } from '@nestjs/common';
import { Student } from 'src/models/student.dto';

@Injectable()
export class StudentService {
  async getStudents(): Promise<Array<Student>> {
    return [];
  }

  async addStudent(student: Student): Promise<Student> {
    return student;
  }

  async editStudent(student: Student): Promise<Student> {
    return student;
  }

  async deleteStudent(id: number):Promise<number> {
    return id;
  }
}
