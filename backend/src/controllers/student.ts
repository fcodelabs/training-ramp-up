import { Request, Response } from "express";
import { StudentService } from "../services/student";
import { Server } from "socket.io";

export class StudentController {
  // private studentService = new StudentService()
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async create(req: Request, res: Response) {
    try {
      const student = await StudentService.create(req.body);
      this.io.emit("add-student", student);
      res.status(201).json(student); // 201 status code for created
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the student." });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      console.log(req.user.role);
      const students = await StudentService.findAll();
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the students." });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const student = await StudentService.edit(
        Number(req.params.id),
        req.body,
      );
      this.io.emit("edit-student", student);
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while editing the student." });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await StudentService.delete(Number(req.params.id));
      this.io.emit("delete-student");
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the student." });
    }
  }
}
