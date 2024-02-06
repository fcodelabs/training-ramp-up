import express, { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = express.Router();
console.log("hello in auth router");

// Create a new student
authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.registerUser);

export default authRouter;
