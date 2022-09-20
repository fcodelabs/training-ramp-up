import express,{Router} from "express";
import { registerUser, loginUser, logoutUser } from '../controllers'

export const userRouter:Router=express.Router();


//Sign Up User
userRouter.post("/register",registerUser);

//Sign In User
userRouter.post("/login",loginUser);

userRouter.put("/logout",logoutUser);

