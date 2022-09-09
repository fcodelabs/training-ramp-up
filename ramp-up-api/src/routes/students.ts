import express from "express";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/students";

const router = express.Router();

router.get("/", getStudents);

router.post("/", addStudent);

router.delete("/:ID", deleteStudent);

router.patch("/:ID", updateStudent);

export default router;
