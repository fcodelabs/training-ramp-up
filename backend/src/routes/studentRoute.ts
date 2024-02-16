import { Application } from "express";
import { StudentController } from "../controllers/student";
import { Server } from "socket.io";
import { checkPermission } from "../middlewares/middleware";
import { authenticate } from "../middlewares/middleware";

export function studentRoutes(app: Application, io: Server) {
  const studentController = new StudentController(io);

  app.use("/students", authenticate());

  app.post(
    "/students",
    checkPermission("addStudent"),
    studentController.create.bind(studentController),
  );
  app.get(
    "/students",
    checkPermission("view"),
    studentController.findAll.bind(studentController),
  );
  app.patch(
    "/students/:id",
    checkPermission("update"),
    studentController.edit.bind(studentController),
  );
  app.delete(
    "/students/:id",
    checkPermission("delete"),
    studentController.delete.bind(studentController),
  );
}
