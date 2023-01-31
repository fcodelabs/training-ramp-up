import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/login", loginController);
userRouter.get("/refresh", refreshTokenController);
userRouter.get("/logout", logoutController);

export default userRouter;
