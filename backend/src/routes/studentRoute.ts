import { Application } from "express";
import { StudentController } from "../controllers/student";
import { Server } from "socket.io";

export function studentRoutes(app: Application, io: Server) {
  const studentController = new StudentController(io);

  app.post("/students", studentController.create.bind(studentController));
  app.get("/students", studentController.findAll.bind(studentController));
  app.patch("/students/:id", studentController.edit.bind(studentController));
  app.delete("/students/:id", studentController.delete.bind(studentController));
}
