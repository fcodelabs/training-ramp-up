import { validateAuth, validateAuthData } from "./../middleware/validator";
import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signUpController,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", validateAuthData, validateAuth, signUpController);
userRouter.post("/login", validateAuthData, validateAuth, loginController);
userRouter.get("/refresh", refreshTokenController);
userRouter.post("/logout", logoutController);

export default userRouter;
