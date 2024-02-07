import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateUser } from "../middlewares/expressValidator/authenticateUser";
import { authAdmin } from "../middlewares/roleValidator/authAdmin";

const userRouter = express.Router();
console.log("hello in user router");

// Create a new student
userRouter.post(
  "/create",
  authenticateUser,
  authAdmin,
  UserController.createUser,
);
userRouter.post("/create-password/:token", UserController.createPassword);

export default userRouter;
