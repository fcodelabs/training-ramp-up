import { Application } from "express";
import { UserController } from "../controllers/user";

export function userRoutes(app: Application) {
  app.post("/users", UserController.create);
}
