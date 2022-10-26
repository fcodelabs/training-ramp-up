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
import { authPermissions } from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(authPermissions, getAllStudents)
  .post(addStudentRules(), studentValidation, authPermissions, addStudent);
router
  .route("/:studentId")
  .put(authPermissions, updateStudentRules(), studentValidation, updateStudent)
  .delete(authPermissions, deleteStudent);

export default router;
