import { Student } from "../models/student";
import { Request, Response } from "express";
import { AppDataSource } from "../index";

export class StudentService {
  static async addNewStudent(req: Request): Promise<Student[]> {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const newStudent = studentRepository.create(req.body);
      const savedStudent = await studentRepository.save(newStudent);
      return savedStudent;
    } catch (error) {
      console.error("Error adding a new student:", error);
      throw new Error("Internal Server Error");
    }
  }

  static async getAllStudents(): Promise<Student[]> {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository.find();
      return students;
    } catch (error) {
      console.error("Error getting all students:", error);
      throw new Error("Internal Server Error");
    }
  }

  static async editStudent(req: Request): Promise<Student> {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      if (student) {
        studentRepository.merge(student, req.body);
        const results = await studentRepository.save(student);
        return results;
      }
      throw new Error("Student not found");
    } catch (error) {
      console.error("Error editing student:", error);
      throw new Error("Internal Server Error");
    }
  }

  static async deleteStudent(req: Request): Promise<void> {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOne({
        where: { id: parseInt(req.params.id) },
      });
      if (student) {
        await studentRepository.remove(student);
        return;
      }
      throw new Error("Student not found");
    } catch (error) {
      console.error("Error deleting student:", error);
      throw new Error("Internal Server Error");
    }
  }
}
