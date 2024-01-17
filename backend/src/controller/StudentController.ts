// src/controller/StudentController.ts

import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController {
  private studentService = new StudentService();

  async all(request: Request, response: Response, next: NextFunction) {
    const students = await this.studentService.getAllStudents();
    return students;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const student = await this.studentService.getStudentById(id);

    if (!student) {
      return "Unregistered student";
    }

    return student;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name, gender, address, mobile, birthday, age } = request.body;
    const createdStudent = await this.studentService.createStudent(
      name,
      gender,
      address,
      mobile,
      birthday,
      age
    );

    return createdStudent;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    try {
      const result = await this.studentService.removeStudent(id);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
