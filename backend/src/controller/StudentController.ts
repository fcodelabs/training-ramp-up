import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/studentService";

export class StudentController {
  private studentService = new StudentService();

  async all(request: Request, response: Response ) {
    await this.studentService
      .getAllStudents()
      .then((students) => {
        return response.status(200).send(students);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async one(request: Request, response: Response ) {
    const id = parseInt(request.params.id);
    await this.studentService
      .getStudentById(id)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async add(request: Request, response: Response ) {
    const { id, name, gender, address, mobile, birthday, age } = request.body;
    await this.studentService
      .createStudent(id, name, gender, address, mobile, birthday, age)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async update(request: Request, response: Response ) {
    const id = parseInt(request.params.id);
    const student = request.body;
    await this.studentService
      .updateStudent(id, student)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async remove(request: Request, response: Response ) {
    const id = parseInt(request.params.id);
    await this.studentService
      .removeStudent(id)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}
