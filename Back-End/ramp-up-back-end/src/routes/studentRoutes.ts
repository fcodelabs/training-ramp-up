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

router
  .route("/")
  .get(getAllStudents)
  .post(addStudentRules(), studentValidation, addStudent);
router
  .route("/:studentId")
  .put(updateStudentRules(), studentValidation, updateStudent)
  .delete(deleteStudent);

export default router;
