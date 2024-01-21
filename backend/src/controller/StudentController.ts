import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { getSocketInstance } from "../services/socketService"; // Import the socket manager
import { userSockets } from "../services/socketService";
import { Server, Socket } from "socket.io";

export class StudentController {
  private studentService = new StudentService();
  private io = getSocketInstance(); // Change this line
  private userId = "123456789"; // Change this line

  async all(request: Request, response: Response) {
    await this.studentService
      .getAllStudents()
      .then((students) => {
        return response.status(200).send(students);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  async one(request: Request, response: Response) {
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

  async add(request: Request, response: Response) {
    const { id, name, gender, address, mobile, birthday, age } = request.body;
    await this.studentService
      .createStudent(id, name, gender, address, mobile, birthday, age)
      .then((student) => {
        sendMessage(this.io, this.userId, "added_successfully", id);
        return response.status(200).send(student);
      })
      .catch((error) => {
        sendMessage(this.io, this.userId, "add_unsuccessfull", id);
        return response.status(500).send(error);
      });
  }

  async update(request: Request, response: Response) {
    const studentId = Number(request.params.id);
    const { id, name, gender, address, mobile, birthday, age } = request.body;
    const student = {
      id,
      name,
      gender,
      address,
      mobile,
      birthday,
      age,
    };
    await this.studentService
      .updateStudent(studentId, student)
      .then((student) => {
        sendMessage(this.io, this.userId, "updated_successfully", studentId);
        return response.status(200).send(student);
      })
      .catch((error) => {
        sendMessage(this.io, this.userId, "update_unsuccessfull", studentId);
        return response.status(500).send(error);
      });
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    await this.studentService
      .removeStudent(id)
      .then((student) => {
        sendMessage(this.io, this.userId, "deleted_successfully", id); 
        return response.status(200).send(student);
      })
      .catch((error) => {
        sendMessage(this.io, this.userId, "delete_successfull", id); 
        return response.status(500).send(error);
      });
  }
}

async function sendMessage(io: Server, userId: string, message: string, studentId: number) {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(message, studentId);
  } else {
    console.warn("User not found:", userId);
  }
}
