import { Application } from "express";
import { UserController } from "../controllers/user";
import { Server } from "socket.io";

export function userRoutes(app: Application, io: Server) {
  const userController = new UserController(io);

  app.patch("/users", UserController.addPassword);
  app.post("/users/login", userController.login.bind(userController));
  app.post("/users/selfRegister", UserController.selfRegister);
  app.post("/users/logout", UserController.logout);
}
