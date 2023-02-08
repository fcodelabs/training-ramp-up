import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "../controllers/userController";
import passport from "passport";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/login", loginController);
userRouter.get("/refresh", refreshTokenController);
userRouter.post("/logout", logoutController);


export default userRouter;