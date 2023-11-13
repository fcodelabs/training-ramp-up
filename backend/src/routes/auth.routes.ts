import express from "express";
import * as AuthController from "../controllers/auth.controllers";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

export const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/refresh", AuthController.refresh);
