import { Request, Response } from "express"
import { StudentService } from "../services/student"

export class StudentController {
  private studentService = new StudentService()

  async create(req: Request, res: Response) {
    const student = await this.studentService.create(req.body)
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
    res.json(student)
  }

  async delete(req: Request, res: Response) {
    await this.studentService.delete(Number(req.params.id))
    res.status(204).send()
  }
}
