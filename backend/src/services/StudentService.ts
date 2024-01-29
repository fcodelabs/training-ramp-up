// src/services/UserService.ts

import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

export class StudentService {
  private studentRepository = AppDataSource.getRepository(Student);

  async getAllStudents() {
    const students = await this.studentRepository.find();
    if (!students) {
      throw new Error("No student found");
    }
    return students;
  }

  async getStudentById(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
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

  async updateStudent(id: number, student: Student) {
    const updatedStudent = await this.studentRepository.update(id, student);
    if (!updatedStudent.affected) {
      throw new Error("Student not found");
    }
    return updatedStudent;
  }
}
