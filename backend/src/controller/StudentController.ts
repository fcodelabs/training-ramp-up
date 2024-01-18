
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

export class StudentController {
  private studentRepository = AppDataSource.getRepository(Student);

  async all(request: Request, response: Response, next: NextFunction) {
    await this.studentRepository
      .find()
      .then((students) => {
        return response.status(200).send(students);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    await this.studentRepository
      .findOne({
        where: { id },
      })
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async add(request: Request, response: Response, next: NextFunction) {
    const { id, name, gender, address, mobile, birthday, age } = request.body;
    const student = this.studentRepository.create({
      id,
      name,
      gender,
      address,
      mobile,
      birthday,
      age,
    });
    await this.studentRepository
      .save(student)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const student = request.body;
    await this.studentRepository
      .update(id, student)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    await this.studentRepository
      .delete(id)
      .then((student) => {
        return response.status(200).send(student);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}
