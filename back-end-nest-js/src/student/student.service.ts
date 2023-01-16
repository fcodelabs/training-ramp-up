import { Injectable } from '@nestjs/common';
import { StudentInterface, UpdateStudentInterface } from './interfaces/student.interface';

@Injectable()
export class StudentService {
  async getAllStudentsService(): Promise<string> {
    return 'Hello World!';
  }

  async addStudentService(newStudent: StudentInterface) {
    return newStudent;
  }

  async updateStudentService(updateStudent: UpdateStudentInterface) {
    return updateStudent;
  }

  async deleteStudentService(studentId: number) {
    return { raw: [], affected: studentId };
  }
}
