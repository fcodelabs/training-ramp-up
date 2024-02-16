// src/services/UserService.ts

import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

export class StudentService {
  private studentRepository = AppDataSource.getRepository(Student);

  async getAllStudents() {
    return this.studentRepository.find();
  }

  async getStudentById(id: number) {
    return this.studentRepository.findOne({
      where: { id },
    });
  }

  async createStudent(
    name: string,
    gender: string,
    address: string,
    mobile: string,
    birthday: Date,
    age: number
  ) {
    const student = this.studentRepository.create({
      name,
      gender,
      address,
      mobile,
      birthday,
      age,
    });
    return this.studentRepository.save(student);
  }

  async removeStudent(id: number) {
    const studentToRemove = await this.studentRepository.findOne({
      where: { id },
    });

    if (!studentToRemove) {
      throw new Error("Student not found");
    }

    await this.studentRepository.remove(studentToRemove);

    return "Student has been removed";
  }
}
