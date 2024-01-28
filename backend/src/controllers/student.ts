import { Request, Response } from "express"
import { StudentService } from "../services/student"
import { Server } from "socket.io"

export class StudentController {
  private studentService = new StudentService()
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  async create(req: Request, res: Response) {
    const student = await this.studentService.create(req.body)
    this.io.emit("add-student", student)
    res.json(student)
  }

  async findAll(req: Request, res: Response) {
    const students = await this.studentService.findAll()
    res.json(students)
  }

  async edit(req: Request, res: Response) {
    const student = await this.studentService.edit(
      Number(req.params.id),
      req.body,
    )
    this.io.emit("edit-student", student)
    res.json(student)
  }

  async delete(req: Request, res: Response) {
    await this.studentService.delete(Number(req.params.id))
    this.io.emit("delete-student")
    res.status(204).send()
  }
}
