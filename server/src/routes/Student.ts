import express,{Router} from "express";
import * as studentController from "../controllers/student.controller";
// import passport from 'passport';

//guards
import { UserAuthGuard } from "../middleware/user.auth.guard";
import { AdminAuthGuard } from "../middleware/admin.auth.guard";


export const studentRouter:Router=express.Router();

//Get all student data
studentRouter.get("/",UserAuthGuard,studentController.getAll)

//Add Student
studentRouter.post("/",UserAuthGuard,AdminAuthGuard,studentController.addOne)

//Update/Edit Student
studentRouter.put("/:id",UserAuthGuard,AdminAuthGuard,studentController.updateOne)

//Delete Student
studentRouter.delete("/:id",UserAuthGuard,AdminAuthGuard,studentController.deleteOne)
