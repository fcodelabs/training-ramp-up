import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/studentController";
import {
  addStudentValidation,
  updateStudentValidation,
} from "../validation/studentValidation";

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudentValidation, addStudent);
router.put("/:studentId", updateStudentValidation, updateStudent);
router.delete("/:studentId", deleteStudent);

export default router;
