import express,{Response,Request,Router} from "express";
import * as studentController from "../controllers/student.controller";


const router:Router=express.Router();

//Get all student data
router.get("/",studentController.getAll)

//Add Student
router.post("/",studentController.addOne)

//Update/Edit Student
router.put("/:id",studentController.updateOne)

//Delete Student
router.delete("/:id",studentController.deleteOne)

export default router