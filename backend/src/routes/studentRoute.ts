import express from "express";
import StudentController from "../controllers/studentController";

const router = express.Router();

// Create a new student
router.post("/add", StudentController.addNewStudentController);
router.get("/allStudents", StudentController.getAllStudentsController);
router.put("/edit/:id", StudentController.editStudentController);
router.delete("/delete/:id", StudentController.deleteStudentController);

export default router;
