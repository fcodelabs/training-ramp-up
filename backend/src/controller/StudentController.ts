import { Request, Response } from "express";
import { StudentService } from "../services/studentService";
import { getSocketInstance } from "../services/socketService";
import { userSockets } from "../services/socketService";
import { Server } from "socket.io";

export class StudentController {
  private studentService = new StudentService();
  private io = getSocketInstance(); 
  async all(request: Request, response: Response) {
    try {
      const students = await this.studentService.getAllStudents();
      console.log("students");
      response.status(200).send(students);
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    try {
      const student = await this.studentService.getStudentById(id);
      response.status(200).send(student);
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async add(request: Request, response: Response) {
    const { id, name, gender, address, mobile, birthday, age } = request.body;
    const userId = request.params.userId;
    try {
      const student = await this.studentService.createStudent(
        id,
        name,
        gender,
        address,
        mobile,
        birthday,
        age
      );
      sendMessage(this.io, userId, "added_successfully", id);
      response.status(200).send(student);
    } catch (error) {
      sendMessage(this.io, userId, "add_unsuccessfull", id);
      response.status(500).send(error);
    }
  }

  async update(request: Request, response: Response) {
    const studentId = Number(request.params.id);
    const userId = request.params.userId;
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
    try {
      const updatedStudent = await this.studentService.updateStudent(
        studentId,
        student
      );
      sendMessage(this.io, userId, "updated_successfully", studentId);
      response.status(200).send(updatedStudent);
    } catch (error) {
      sendMessage(this.io, userId, "update_unsuccessful", studentId);
      response.status(500).send(error);
    }
  }
  
  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const userId = request.params.userId;

    try {
      const removedStudent = await this.studentService.removeStudent(id);
      sendMessage(this.io, userId, "deleted_successfully", id);
      response.status(200).send(removedStudent);
    } catch (error) {
      sendMessage(this.io, userId, "delete_unsuccessful", id);
      response.status(500).send(error);
    }
  }
}
async function sendMessage(
  io: Server,
  userId: string,
  message: string,
  studentId: number
) {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(message, studentId);
  } else {
    console.warn("User not found:", userId);
  }
}
