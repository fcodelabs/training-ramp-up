import { Application } from "express";
import { AuthController } from "../controllers/authController";
import { authenticate } from "../middlewares/middleware";
import { checkPermission } from "../middlewares/middleware";

export function authRoutes(app: Application) {
  app.use("/auth", authenticate());
  app.post("/auth", checkPermission("addUser"), AuthController.create);
  app.get("/auth", AuthController.authCheck);
}
