import express from "express";

import {
  addStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../controllers/studentController";
import {
  studentValidation,
  updateStudentRules,
  addStudentRules,
} from "../validation/studentValidation";

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudentRules(), studentValidation, addStudent);
router.put(
  "/:studentId",
  updateStudentRules(),
  studentValidation,
  updateStudent
);
router.delete("/:studentId", deleteStudent);

export default router;
