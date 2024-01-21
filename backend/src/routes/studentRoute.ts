import { Application } from "express"
import { StudentController } from "../controllers/student"

export function studentRoutes(app: Application) {
  const studentController = new StudentController()

  app.post("/students", studentController.create.bind(studentController))
  app.get("/students", studentController.findAll.bind(studentController))
  app.patch("/students/:id", studentController.edit.bind(studentController))
  app.delete("/students/:id", studentController.delete.bind(studentController))
}
