import { Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { Student } from "../models/student";

export class StudentController {
  static async addNewStudent(req: Request, res: Response) {
    try {
      const savedStudent = await StudentService.addNewStudent(req);
      res.status(201).json(savedStudent);
    } catch (error) {
      console.error("Error adding a new student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      console.error("Error getting all students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async editStudent(req: Request, res: Response) {
    try {
      const updatedStudent = await StudentService.editStudent(req);
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error("Error editing student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      await StudentService.deleteStudent(req);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
