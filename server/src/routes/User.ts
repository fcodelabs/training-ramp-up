import express,{Router} from "express";
import { registerUser, loginUser, logoutUser, loginStatus } from '../controllers'
import { UserAuthGuard } from "../middleware/user.auth.guard";

export const userRouter:Router=express.Router();


//Sign Up User
userRouter.post("/register",registerUser);

//Sign In User
userRouter.post("/login",loginUser);

//Check user status
userRouter.get("/status",UserAuthGuard,loginStatus);

//Log out user
userRouter.delete("/logout",logoutUser);

